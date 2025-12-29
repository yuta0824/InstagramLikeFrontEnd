'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { exchangeTokenAndSetCookie } from '@/features/auth/api/exchangeTokenAndSetCookie'

export default function AuthCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const authCode = searchParams.get('auth_code')

  useEffect(() => {
    const handleAuth = async () => {
      if (!authCode) {
        router.replace('/?auth_error=missing_auth_code')
        return
      }

      try {
        await exchangeTokenAndSetCookie(authCode)
        router.replace('/home')
      } catch (error) {
        console.error('Failed to exchange auth_code:', error)
        router.replace('/?auth_error=token_exchange')
      }
    }

    handleAuth()
  }, [authCode, router])

  return <div>Loading...</div>
}
