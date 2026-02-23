import { getJwtFromCookie } from '@/features/auth/modules/getJwtFromCookie'
import { userPostApi } from '@instagram-like-app/http-client'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useGetUserPosts = (userId: number | undefined) => {
  const jwt = getJwtFromCookie()

  return useInfiniteQuery({
    queryKey: ['getUserPosts', userId],
    queryFn: async ({ pageParam }) => {
      return await userPostApi
        .apiUsersUserIdPostsGet({ userId: userId!, cursor: pageParam }, { headers: { Authorization: `Bearer ${jwt}` } })
        .catch(error => {
          console.error(error)
          throw new Error('ユーザー投稿の取得に失敗しました。')
        })
    },
    initialPageParam: undefined as string | undefined,
    getNextPageParam: lastPage => {
      return lastPage.hasMore ? (lastPage.nextCursor ?? undefined) : undefined
    },
    enabled: !!jwt && userId !== undefined
  })
}
