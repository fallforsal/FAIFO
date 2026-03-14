// ============================================================
// Shared TypeScript types for the Supabase data layer
// ============================================================

export type ChipStatus = 'AVAILABLE' | 'WISH_LOCKED' | 'DIARY_LOCKED'

export interface Product {
    id: string
    name: string
    description: string | null
    model_3d_url: string | null
    story_text: string | null
    video_url: string | null
    created_at: string
}

export interface NfcChip {
    id: string
    product_id: string
    status: ChipStatus
    owner_id: string | null
}

export interface Interaction {
    id: string
    nfc_chip_id: string
    content: string
    media_url: string | null
    created_at: string
}

/**
 * Combined data shape returned by the scan page query.
 * This is what CinematicFlow receives as `initialData`.
 */
export interface ScanPageData {
    chip: NfcChip
    product: Product
    interactions: Interaction[]
}
