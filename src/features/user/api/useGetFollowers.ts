import { getJwtFromCookie } from '@/features/auth/modules/getJwtFromCookie'
import { userFollowerApi } from '@instagram-like-app/http-client'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useGetFollowers = (userId: number | undefined) => {
  const jwt = getJwtFromCookie()

  return useInfiniteQuery({
    queryKey: ['getFollowers', userId],
    queryFn: async ({ pageParam }) => {
      return await userFollowerApi
        .apiUsersUserIdFollowersGet(
          { userId: userId!, cursor: pageParam },
          { headers: { Authorization: `Bearer ${jwt}` } }
        )
        .catch(error => {
          console.error(error)
          throw new Error('フォロワーの取得に失敗しました。')
        })
    },
    initialPageParam: undefined as string | undefined,
    getNextPageParam: lastPage => {
      return lastPage.hasMore ? (lastPage.nextCursor ?? undefined) : undefined
    },
    enabled: !!jwt && userId !== undefined
  })
}
