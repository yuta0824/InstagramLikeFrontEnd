import { getJwtFromCookie } from '@/features/auth/modules/getJwtFromCookie'
import { userPostApi } from '@instagram-like-app/http-client'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useGetUserPosts = (userId: number | undefined) => {
  const jwt = getJwtFromCookie()

  return useInfiniteQuery({
    queryKey: ['getUserPosts', userId],
    queryFn: async ({ pageParam }) => {
      return await userPostApi
        .apiUsersUserIdPostsGet({ userId: userId!, page: pageParam }, { headers: { Authorization: `Bearer ${jwt}` } })
        .catch(error => {
          console.error(error)
          throw new Error('ユーザー投稿の取得に失敗しました。')
        })
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      return lastPage.length === 0 ? undefined : lastPageParam + 1
    },
    enabled: !!jwt && userId !== undefined
  })
}
