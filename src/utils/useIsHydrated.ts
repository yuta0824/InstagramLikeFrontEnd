'use client'

import { useSyncExternalStore } from 'react'

/**
 * クライアントサイドでマウント完了（Hydrated）したかどうかを返す
 */
export const useIsHydrated = (): boolean => {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )
}
