import { authApi } from '@instagram-like-app/http-client'
import { setJwtCookie } from '../modules/setJwtCookie'

export const exchangeTokenAndSetCookie = async (authCode: string) => {
  const data = await authApi.apiAuthTokenGet({ authCode })
  setJwtCookie(data.jwt, data.exp)
}
