import { authApi } from '@instagram-like-app/http-client'

export const exchangeTokenAndSetCookie = async (authCode: string) => {
  const data = await authApi.apiAuthTokenGet({ authCode })
  const currentTime = Math.floor(Date.now() / 1000)
  const maxAge = Math.max(data.exp - currentTime, 0)
  const secureFlag = window.location.protocol === 'https:' ? '; Secure' : ''

  document.cookie = `jwt=${data.jwt}; Max-Age=${maxAge}; SameSite=Strict; Path=/${secureFlag}`
}
