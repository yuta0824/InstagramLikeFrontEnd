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
          { userId: userId!, cursor: pageParam },
          { headers: { Authorization: `Bearer ${jwt}` } }
        )
        .catch(error => {
          console.error(error)
          throw new Error('フォロー中ユーザーの取得に失敗しました。')
        })
    },
    initialPageParam: undefined as string | undefined,
    getNextPageParam: lastPage => {
      return lastPage.hasMore ? (lastPage.nextCursor ?? undefined) : undefined
    },
    enabled: !!jwt && userId !== undefined
  })
}
