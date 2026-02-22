import { getJwtFromCookie } from '@/features/auth/modules/getJwtFromCookie'
import { notificationApi } from '@instagram-like-app/http-client'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useGetNotifications = () => {
  const jwt = getJwtFromCookie()

  return useInfiniteQuery({
    queryKey: ['getNotifications'],
    queryFn: async ({ pageParam }) => {
      return await notificationApi
        .apiNotificationsGet({ page: pageParam }, { headers: { Authorization: `Bearer ${jwt}` } })
        .catch(error => {
          console.error(error)
          throw new Error('通知の取得に失敗しました。')
        })
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      return lastPage.length === 0 ? undefined : lastPageParam + 1
    },
    enabled: !!jwt
  })
}
