'use client'

import { toast } from 'sonner'

export const copyTextToClipboard = async (value: string): Promise<boolean> => {
  if (typeof navigator === 'undefined' || !navigator.clipboard) {
    return false
  }

  try {
    await navigator.clipboard.writeText(value)
    toast.success('リンクをコピーしました')
    return true
  } catch (error) {
    console.error('[copyTextToClipboard]', error)
    toast.error('リンクのコピーに失敗しました')
    return false
  }
}
