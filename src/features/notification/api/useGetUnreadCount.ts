import { getJwtFromCookie } from '@/features/auth/modules/getJwtFromCookie'
import { notificationApi } from '@instagram-like-app/http-client'
import { useQuery } from '@tanstack/react-query'

export const useGetUnreadCount = () => {
  const jwt = getJwtFromCookie()

  const { data, isLoading, error } = useQuery({
    queryKey: ['getUnreadCount'],
    queryFn: async () => {
      return await notificationApi
        .apiNotificationsUnreadCountGet({
          headers: { Authorization: `Bearer ${jwt}` }
        })
        .catch(error => {
          console.error(error)
          throw new Error('未読通知数の取得に失敗しました。')
        })
    },
    enabled: !!jwt,
    staleTime: 5_000,
    refetchInterval: 10_000
  })

  return { data, isLoading, error }
}
