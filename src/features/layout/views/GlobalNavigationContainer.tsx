'use client'

import { GlobalNavigation } from '@/components/layout/GlobalNavigation'

export const GlobalNavigationContainer = () => {
  const handleLogout = () => {
    alert('logout')
  }

  return (
    <GlobalNavigation
      name="yuta"
      email="yuta@example.com"
      myPageUrl="/account/yuta"
      avatarUrl="/icon_avatar2.webp"
      onLogout={handleLogout}
    />
  )
}
