'use server'

import { supabaseServer } from '@/lib/supabase-server'
import { revalidatePath } from 'next/cache'
import { sendOrderConfirmationEmail } from '@/app/actions/email.actions'
// ─── Types ───────────────────────────────────────────────────────────────────

export interface OrderData {
    user_id?: string
    customer_name: string
    customer_phone: string
    customer_email?: string
    shipping_address: string
    total_amount: number
    shipping_fee: number
    payment_method: string
    notes?: string
}

export interface CartItem {
    product_id: string
    quantity: number
    unit_price: number
}

interface ActionResult<T = undefined> {
    success: boolean
    data?: T
    error?: string
}

// ─── Actions ─────────────────────────────────────────────────────────────────

export async function createOrder(
    orderData: OrderData,
    cartItems: CartItem[],
): Promise<ActionResult<{ order_id: string }>> {
    try {
        // ─── BƯỚC 1: TRẠM KIỂM LÂM (PRE-CHECK) TỒN KHO & LẤY TÊN SẢN PHẨM ───
        const productIds = cartItems.map(item => item.product_id);

        const { data: currentProducts, error: fetchError } = await supabaseServer
            .from('products') // Kiểm tra lại xem tên bảng trong DB của ông có đúng chữ 'products' viết thường không có 's' hay không?
            .select('id, name, stock_quantity') // Kiểm tra lại xem có đúng cột 'name' và 'stock' không?
            .in('id', productIds);

        // HIỆN NGUYÊN HÌNH CÁI LỖI TỪ DATABASE LÊN UI
        if (fetchError) {
            console.error("Lỗi Supabase chi tiết:", fetchError);
            return {
                success: false,
                error: `Lỗi Database: ${fetchError.message}` // Bắn thẳng lỗi thật ra ngoài
            };
        }

        if (!currentProducts) {
            return { success: false, error: 'Không nhận được dữ liệu phản hồi từ kho hàng.' };
        }

        // Kiểm tra từng món trong giỏ
        for (const item of cartItems) {
            const dbProduct = currentProducts.find(p => p.id === item.product_id);

            if (!dbProduct) {
                return { success: false, error: 'Có sản phẩm không còn tồn tại trong hệ thống.' };
            }

            if (item.quantity > dbProduct.stock_quantity) {
                // CHẶN ĐỨNG VÀ BÁO LỖI BẰNG TÊN SẢN PHẨM
                return {
                    success: false,
                    error: `Sản phẩm "${dbProduct.name}" hiện chỉ còn ${dbProduct.stock_quantity} chiếc trong kho.`
                };
            }
        }

        // ─── BƯỚC 2: GỌI RPC (Chỉ chạy khi đã qua được trạm kiểm lâm) ───
        const { data: orderId, error } = await supabaseServer.rpc(
            'create_order_transaction',
            {
                p_order_data: {
                    user_id: orderData.user_id ?? null,
                    customer_name: orderData.customer_name,
                    customer_phone: orderData.customer_phone,
                    customer_email: orderData.customer_email ?? null,
                    shipping_address: orderData.shipping_address,
                    total_amount: orderData.total_amount,
                    shipping_fee: orderData.shipping_fee,
                    payment_method: orderData.payment_method,
                    notes: orderData.notes ?? '',
                },
                p_cart_items: cartItems
            }
        )

        if (error) {
            console.error('[createOrder] Lỗi khi thực thi RPC:', error)
            return { success: false, error: error.message }
        }

        // PHÁ CACHE: Ép Next.js cập nhật lại số lượng tồn kho mới nhất
        revalidatePath('/shop')
        revalidatePath('/shop/[id]', 'page')
        // ─── BƯỚC 3: GỬI EMAIL XÁC NHẬN ĐƠN HÀNG ───
        // Kiểm tra xem khách có nhập email không thì mới gửi
        if (orderData.customer_email) {
            const finalOrderId = orderId as string;
            // Format tiền thành chuẩn VNĐ (VD: 4.830.000 đ)
            const formattedTotal = (orderData.total_amount + orderData.shipping_fee).toLocaleString('vi-VN') + ' đ';

            // Gọi hàm gửi mail từ Resend (không dùng await cũng được để không chặn luồng UI, nhưng dùng await để bắt lỗi nếu cần)
            await sendOrderConfirmationEmail(
                orderData.customer_email,
                orderData.customer_name,
                finalOrderId,
                formattedTotal
            );
        }
        return { success: true, data: { order_id: orderId as string } }
    } catch (err) {
        console.error('[createOrder] Lỗi hệ thống bất ngờ:', err)
        return {
            success: false,
            error: err instanceof Error ? err.message : 'Lỗi không xác định',
        }
    }
}