'use server'

import { supabaseServer } from '@/lib/supabase-server'

type InteractionType = 'GREETING' | 'DIARY_ENTRY'

interface SaveResult {
    success: boolean
    error?: string
}

/**
 * Server Action: persist an interaction and lock the NFC chip status.
 *
 * 1. INSERT into `interactions` table.
 * 2. UPDATE `nfc_chips.status` → WISH_LOCKED (GREETING) or DIARY_LOCKED (DIARY_ENTRY).
 */
export async function saveInteraction(
    nfcChipId: string,
    type: InteractionType,
    content: string,
): Promise<SaveResult> {
    try {
        // 1. Insert the interaction
        const { error: insertError } = await supabaseServer
            .from('interactions')
            .insert({
                nfc_chip_id: nfcChipId,
                type,
                content,
            })

        if (insertError) {
            console.error('[saveInteraction] insert failed:', insertError)
            return { success: false, error: insertError.message }
        }

        // 2. Update chip status
        const newStatus = type === 'GREETING' ? 'WISH_LOCKED' : 'DIARY_LOCKED'

        const { error: updateError } = await supabaseServer
            .from('nfc_chips')
            .update({ status: newStatus })
            .eq('id', nfcChipId)

        if (updateError) {
            console.error('[saveInteraction] status update failed:', updateError)
            return { success: false, error: updateError.message }
        }

        return { success: true }
    } catch (err) {
        console.error('[saveInteraction] unexpected error:', err)
        return {
            success: false,
            error: err instanceof Error ? err.message : 'Unknown error',
        }
    }
}
