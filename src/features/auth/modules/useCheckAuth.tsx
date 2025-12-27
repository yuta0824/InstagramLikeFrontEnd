import { getJwtFromCookie } from './getJwtFromCookie'

export const useCheckAuth = () => {
  const jwt = getJwtFromCookie()
  const isSignedIn = Boolean(jwt)
  const isLoading = false

  // TODO: User情報をAPIで取得してJWTの情報が正しいことを確認する

  return { isSignedIn, isLoading }
}
