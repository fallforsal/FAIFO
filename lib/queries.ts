import { supabase } from '@/lib/supabase'
import type { ScanPageData, Product, NfcChip, Interaction } from '@/lib/types'

/**
 * Fetch all data needed for the cinematic scan page.
 *
 * Performs a joined query:  nfc_chips → products + interactions
 * sorted by interaction created_at ascending (oldest first).
 *
 * @returns ScanPageData if found, null otherwise.
 */
export async function fetchScanData(chipId: string): Promise<ScanPageData | null> {
    const { data, error } = await supabase
        .from('nfc_chips')
        .select(`
            *,
            products (*),
            interactions (*, created_at)
        `)
        .eq('id', chipId)
        .order('created_at', { referencedTable: 'interactions', ascending: true })
        .single()

    if (error || !data) {
        console.error('[fetchScanData]', error?.message ?? 'No data returned')
        return null
    }

    // Supabase returns the joined product as an object and interactions as an array.
    const chip: NfcChip = {
        id: data.id,
        product_id: data.product_id,
        status: data.status,
        owner_id: data.owner_id,
    }

    const product = data.products as unknown as Product
    const interactions = (data.interactions ?? []) as unknown as Interaction[]

    return { chip, product, interactions }
}
