'use client'

import { Suspense, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { exchangeTokenAndSetCookie } from '@/features/auth/api/exchangeTokenAndSetCookie'
import { LoadingScreen } from '@/components/layout/LoadingScreen'

const AuthCallbackContent = () => {
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

  return <LoadingScreen />
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <AuthCallbackContent />
    </Suspense>
  )
}
