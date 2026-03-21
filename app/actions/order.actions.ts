'use server'

import { supabaseServer } from '@/lib/supabase-server'
import { revalidatePath } from 'next/cache'

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
    notes?: string // THÊM DÒNG NÀY: Để nhận ghi chú từ Store
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

/**
 * Tạo đơn hàng mới sử dụng Stored Procedure (RPC) để đảm bảo tính nguyên tử (Atomic).
 * Nếu một bước lỗi (ví dụ: hết hàng), toàn bộ quá trình sẽ được hủy bỏ tự động.
 */
export async function createOrder(
    orderData: OrderData,
    cartItems: CartItem[],
): Promise<ActionResult<{ order_id: string }>> {
    try {
        // GỌI DUY NHẤT 1 HÀM RPC TRÊN DATABASE
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
                    notes: orderData.notes ?? '', // TRUYỀN GHI CHÚ XUỐNG ĐÂY
                },
                p_cart_items: cartItems // Truyền thẳng mảng sản phẩm
            }
        )

        if (error) {
            console.error('[createOrder] Lỗi khi thực thi RPC:', error)
            return { success: false, error: error.message }
        }

        // PHÁ CACHE: Ép Next.js cập nhật lại số lượng tồn kho mới nhất ở trang Shop
        revalidatePath('/shop')
        revalidatePath('/shop/[id]', 'page')

        return { success: true, data: { order_id: orderId as string } }
    } catch (err) {
        console.error('[createOrder] Lỗi hệ thống bất ngờ:', err)
        return {
            success: false,
            error: err instanceof Error ? err.message : 'Lỗi không xác định',
        }
    }
}