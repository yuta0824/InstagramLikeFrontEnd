import { getJwtFromCookie } from '@/features/auth/modules/getJwtFromCookie'
import { userApi } from '@instagram-like-app/http-client'
import { useQuery } from '@tanstack/react-query'

export const useSearchUserByName = (userName: string) => {
  const jwt = getJwtFromCookie()

  const { data, isLoading, error } = useQuery({
    queryKey: ['searchUserByName', userName],
    queryFn: async () => {
      const users = await userApi
        .apiUsersGet({ q: userName }, { headers: { Authorization: `Bearer ${jwt}` } })
        .catch(error => {
          console.error(error)
          throw new Error('ユーザーの検索に失敗しました。')
        })
      const exactMatch = users.find(u => u.name === userName)
      if (!exactMatch) {
        throw new Error('ユーザーが見つかりません。')
      }
      return exactMatch
    },
    enabled: !!jwt && !!userName
  })

  return { data, isLoading, error }
}
