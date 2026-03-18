'use server'

import { supabaseServer } from '@/lib/supabase-server'

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
}

export interface CartItem {
    product_id: string
    quantity: number
    unit_price: number
}

interface Order {
    id: string
    user_id: string | null
    customer_name: string
    customer_phone: string
    customer_email: string | null
    shipping_address: string
    total_amount: number
    shipping_fee: number
    payment_method: string
    status: string
    created_at: string
}

interface ActionResult<T = undefined> {
    success: boolean
    data?: T
    error?: string
}

// ─── Actions ─────────────────────────────────────────────────────────────────

/**
 * Create a new order with its items and decrement product stock.
 *
 * Flow:
 *  1. Insert into `orders` → get back `order_id`.
 *  2. Bulk insert all cart items into `order_items`.
 *  3. Decrement `stock_quantity` for every purchased product.
 */
export async function createOrder(
    orderData: OrderData,
    cartItems: CartItem[],
): Promise<ActionResult<Order>> {
    try {
        // ── Step 1: Insert order ─────────────────────────────────────────
        const { data: order, error: orderError } = await supabaseServer
            .from('orders')
            .insert({
                user_id: orderData.user_id ?? null,
                customer_name: orderData.customer_name,
                customer_phone: orderData.customer_phone,
                customer_email: orderData.customer_email ?? null,
                shipping_address: orderData.shipping_address,
                total_amount: orderData.total_amount,
                shipping_fee: orderData.shipping_fee,
                payment_method: orderData.payment_method,
                status: 'pending',
            })
            .select()
            .single()

        if (orderError) {
            console.error('[createOrder] insert order failed:', orderError)
            return { success: false, error: orderError.message }
        }

        const orderId = order.id as string

        // ── Step 2: Bulk insert order items ──────────────────────────────
        const orderItems = cartItems.map((item) => ({
            order_id: orderId,
            product_id: item.product_id,
            quantity: item.quantity,
            unit_price: item.unit_price,
        }))

        const { error: itemsError } = await supabaseServer
            .from('order_items')
            .insert(orderItems)

        if (itemsError) {
            console.error('[createOrder] insert order_items failed:', itemsError)
            return { success: false, error: itemsError.message }
        }

        // ── Step 3: Decrement stock for each product ─────────────────────
        for (const item of cartItems) {
            const { error: stockError } = await supabaseServer.rpc(
                'decrement_stock',
                {
                    p_product_id: item.product_id,
                    p_quantity: item.quantity,
                },
            )

            if (stockError) {
                console.error(
                    `[createOrder] decrement stock failed for product ${item.product_id}:`,
                    stockError,
                )
                return { success: false, error: stockError.message }
            }
        }

        return { success: true, data: order as Order }
    } catch (err) {
        console.error('[createOrder] unexpected error:', err)
        return {
            success: false,
            error: err instanceof Error ? err.message : 'Unknown error',
        }
    }
}
