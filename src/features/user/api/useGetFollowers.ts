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
          { userId: userId!, page: pageParam },
          { headers: { Authorization: `Bearer ${jwt}` } }
        )
        .catch(error => {
          console.error(error)
          throw new Error('フォロワーの取得に失敗しました。')
        })
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      return lastPage.length === 0 ? undefined : lastPageParam + 1
    },
    enabled: !!jwt && userId !== undefined
  })
}
