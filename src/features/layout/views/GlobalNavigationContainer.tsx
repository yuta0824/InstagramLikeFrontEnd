'use client'

import { GlobalNavigation } from '@/components/layout/GlobalNavigation'
import { LoadingScreen } from '@/components/layout/LoadingScreen'
import { useLogout } from '@/features/auth/api/useLogout'
import { deleteJwtFromCookie } from '@/features/auth/modules/deleteJwtFromCookie'
import { useGetMe } from '@/features/user/api/useGetMe'
import { useRouter } from 'next/navigation'

export const GlobalNavigationContainer = () => {
  const { data, error, isLoading } = useGetMe()
  const { logoutMutation } = useLogout()
  const router = useRouter()
  if (!data || !logoutMutation || error) return null

  const name = data?.name
  const myPageUrl = `/accounts/${data?.name}`
  const handleLogout = () => {
    logoutMutation.mutate()
    deleteJwtFromCookie()
    router.push('/')
  }

  return isLoading ? <LoadingScreen /> : <GlobalNavigation name={name} myPageUrl={myPageUrl} onLogout={handleLogout} />
}
