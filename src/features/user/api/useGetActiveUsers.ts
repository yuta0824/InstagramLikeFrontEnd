import { getJwtFromCookie } from '@/features/auth/modules/getJwtFromCookie'
import { activeUserApi } from '@instagram-like-app/http-client'
import { useQuery } from '@tanstack/react-query'

export const useGetActiveUsers = () => {
  const jwt = getJwtFromCookie()

  const fetchGetActiveUsers = async () => {
    return await activeUserApi
      .apiActiveUsersGet(
        { limit: 5 },
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
