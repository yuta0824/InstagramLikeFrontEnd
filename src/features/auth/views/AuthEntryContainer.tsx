'use client'

import { useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { AuthEntry } from '../components/AuthEntry'
import { useCheckAuth } from '../api/useCheckAuth'

export const AuthEntryContainer = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const hasShownAuthError = useRef(false)
  const { isSignedIn } = useCheckAuth()

  const redirectToHomeIfSignedIn = () => {
    if (isSignedIn) router.replace('/home')
  }

  const notifyAuthErrorAndCleanUrl = () => {
    const authError = searchParams.get('auth_error')
    if (!authError || hasShownAuthError.current) return
    hasShownAuthError.current = true
    toast.error('認証に失敗しました。')
    const nextParams = new URLSearchParams(searchParams.toString())
    nextParams.delete('auth_error')
    const nextQuery = nextParams.toString()
    router.replace(nextQuery ? `/?${nextQuery}` : '/')
  }

  const handleAuth = () => {
    const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL
    if (!NEXT_PUBLIC_API_URL) return
    window.location.href = `${NEXT_PUBLIC_API_URL}/api/users/auth?service=google`
  }

  useEffect(redirectToHomeIfSignedIn, [isSignedIn, router])
  useEffect(notifyAuthErrorAndCleanUrl, [searchParams, router])

  return <AuthEntry onAuth={handleAuth} />
}
