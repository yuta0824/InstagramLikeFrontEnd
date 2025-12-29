'use client'

import { useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { useCheckAuth } from '@/features/auth/api/useCheckAuth'

export default function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const { isSignedIn, isLoading } = useCheckAuth()

  useEffect(() => {
    if (!isLoading && !isSignedIn) {
      router.replace('/')
    }
  }, [isLoading, isSignedIn, router])

  if (isLoading) return <div>Loading...</div>
  return isSignedIn ? children : null
}
