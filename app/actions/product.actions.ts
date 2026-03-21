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
export async function getProducts(params?: { sort?: string; category?: string; q?: string }) {
    try {
        let query = supabaseServer.from('products').select('*')

        // 1. Lọc theo Category (Từ Header hoặc CategorySearch)
        if (params?.category) {
            query = query.eq('category', params.category)
        }

        // 2. Tìm kiếm theo Tên (Từ Header)
        if (params?.q) {
            query = query.ilike('name', `%${params.q}%`)
        }

        // 3. Sắp xếp (Từ thanh Toolbar FEATURED)
        if (params?.sort) {
            switch (params.sort) {
                case 'price-asc':
                    query = query.order('price', { ascending: true })
                    break;
                case 'price-desc':
                    query = query.order('price', { ascending: false })
                    break;
                case 'new-arrivals':
                    query = query.order('created_at', { ascending: false })
                    break;
                case 'best-selling':
                    // Cái này hơi khó nếu ông chưa có cột sales_count. Tạm thời xếp theo view hoặc ngẫu nhiên
                    query = query.order('created_at', { ascending: true })
                    break;
                default:
                    query = query.order('created_at', { ascending: false })
            }
        } else {
            // Mặc định là mới nhất
            query = query.order('created_at', { ascending: false })
        }

        const { data, error } = await query

        if (error) throw error
        return { success: true, data }
    } catch (error) {
        console.error('Lỗi khi lấy sản phẩm:', error)
        return { success: false, data: null }
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
