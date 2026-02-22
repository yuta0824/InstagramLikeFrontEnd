import { getJwtFromCookie } from '@/features/auth/modules/getJwtFromCookie'
import { userFollowingApi } from '@instagram-like-app/http-client'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useGetFollowings = (userId: number | undefined) => {
  const jwt = getJwtFromCookie()

  return useInfiniteQuery({
    queryKey: ['getFollowings', userId],
    queryFn: async ({ pageParam }) => {
      return await userFollowingApi
        .apiUsersUserIdFollowingsGet(
          { userId: userId!, page: pageParam },
          { headers: { Authorization: `Bearer ${jwt}` } }
        )
        .catch(error => {
          console.error(error)
          throw new Error('フォロー中ユーザーの取得に失敗しました。')
        })
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      return lastPage.length === 0 ? undefined : lastPageParam + 1
    },
    enabled: !!jwt && userId !== undefined
  })
}
