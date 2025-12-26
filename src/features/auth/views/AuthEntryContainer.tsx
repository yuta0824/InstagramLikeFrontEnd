'use client'

import { AuthEntry } from '../components/AuthEntry'

export const AuthEntryContainer = () => {
  const handleAuth = () => {
    alert('login')
  }

  return <AuthEntry onAuth={handleAuth} />
}
