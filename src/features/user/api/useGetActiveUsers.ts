import { getJwtFromCookie } from '@/features/auth/modules/getJwtFromCookie'
import { activeUserApi } from '@instagram-like-app/http-client'
import { useQuery } from '@tanstack/react-query'

const ACTIVE_USERS_LIMIT = 5

export const useGetActiveUsers = () => {
  const jwt = getJwtFromCookie()

  const fetchGetActiveUsers = async () => {
    return await activeUserApi
      .apiActiveUsersGet(
        { limit: ACTIVE_USERS_LIMIT },
        {
          headers: { Authorization: `Bearer ${jwt}` }
        }
      )
      .catch(error => {
        console.error(error)
        throw new Error('アクティブユーザーの取得に失敗しました。')
      })
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ['getActiveUsers'],
    queryFn: fetchGetActiveUsers,
    enabled: !!jwt
  })

  return {
    data,
    isLoading,
    error
  }
}
