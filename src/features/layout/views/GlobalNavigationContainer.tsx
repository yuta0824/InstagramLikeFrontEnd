'use client'

import { GlobalNavigation } from '@/components/layout/GlobalNavigation'
import { useGetMe } from '@/features/user/api/useGetMe'

export const GlobalNavigationContainer = () => {
  const { data, error, isLoading } = useGetMe()
  if (!data || error) return

  const name = data?.name
  const myPageUrl = `/accounts/${data?.name}`
  const handleLogout = () => {
    // TODO: ログアウトの実装
    console.log('logout')
  }

  return isLoading ? <p>Loading...</p> : <GlobalNavigation name={name} myPageUrl={myPageUrl} onLogout={handleLogout} />
}
