'use client'

import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCheckAuth } from '@/features/auth/api/useCheckAuth'
import { useIsHydrated } from '@/utils/useIsHydrated'

export default function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const { isSignedIn, isLoading } = useCheckAuth()
  const isHydrated = useIsHydrated()

  const redirectToSignInIfSignedOut = () => {
    if (!isHydrated) return
    if (!isLoading && !isSignedIn) router.replace('/')
  }
  useEffect(redirectToSignInIfSignedOut, [isHydrated, isLoading, isSignedIn, router])

  if (!isHydrated || isLoading) return <div>Loading...</div>
  return isSignedIn ? children : null
}
