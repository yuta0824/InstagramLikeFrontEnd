import { getJwtFromCookie } from '@/features/auth/modules/getJwtFromCookie'
import { userApi } from '@instagram-like-app/http-client'
import { useQuery } from '@tanstack/react-query'

export const useExploreUsers = (query: string) => {
  const jwt = getJwtFromCookie()

  const { data, isLoading, error } = useQuery({
    queryKey: ['exploreUsers', query],
    queryFn: async () => {
      const users = await userApi
        .apiUsersGet({ q: query }, { headers: { Authorization: `Bearer ${jwt}` } })
        .catch(error => {
          console.error(error)
          throw new Error('ユーザーの検索に失敗しました。')
        })
      return users
    },
    enabled: !!jwt && query.length > 0
  })

  return { data, isLoading, error }
}
