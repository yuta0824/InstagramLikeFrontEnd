import { useMutation, UseMutationResult } from '@tanstack/react-query'
import { getJwtFromCookie } from '../modules/getJwtFromCookie'
import { authApi } from '@instagram-like-app/http-client'

export const useLogout = (): {
  logoutMutation: UseMutationResult<void, Error, void, unknown>
} => {
  const jwt = getJwtFromCookie()
  const logoutMutation = useMutation({
    mutationFn: async () => {
      return await authApi
        .apiAuthLogoutDelete({
          authorization: `Bearer ${jwt}`
        })
        .catch(error => {
          console.error(error)
          throw new Error('ログアウトに失敗しました。')
        })
    }
  })
  return { logoutMutation }
}
