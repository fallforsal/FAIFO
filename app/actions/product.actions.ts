'use server'

import { supabaseServer } from '@/lib/supabase-server'

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Product {
    id: string
    name: string
    description: string | null
    model_3d_url: string | null
    story_text: string | null
    video_url: string | null
    created_at: string
    price: number
    stock_quantity: number
    images: string | null
    category: string | null
}

interface ActionResult<T = undefined> {
    success: boolean
    data?: T
    error?: string
}

// ─── Actions ─────────────────────────────────────────────────────────────────

/**
 * Fetch all purchasable products (in-stock only).
 */
export async function getProducts(): Promise<ActionResult<Product[]>> {
    try {
        const { data, error } = await supabaseServer
            .from('products')
            .select('*')
            .gt('stock_quantity', 0)
            .order('created_at', { ascending: false })

        if (error) {
            console.error('[getProducts] query failed:', error)
            return { success: false, error: error.message }
        }

        return { success: true, data: data as Product[] }
    } catch (err) {
        console.error('[getProducts] unexpected error:', err)
        return {
            success: false,
            error: err instanceof Error ? err.message : 'Unknown error',
        }
    }
}

/**
 * Fetch a single product by its ID.
 */
export async function getProductById(
    id: string,
): Promise<ActionResult<Product>> {
    try {
        const { data, error } = await supabaseServer
            .from('products')
            .select('*')
            .eq('id', id)
            .single()

        if (error) {
            console.error('[getProductById] query failed:', error)
            return { success: false, error: error.message }
        }

        return { success: true, data: data as Product }
    } catch (err) {
        console.error('[getProductById] unexpected error:', err)
        return {
            success: false,
            error: err instanceof Error ? err.message : 'Unknown error',
        }
    }
}
