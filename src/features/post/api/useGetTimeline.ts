import { getJwtFromCookie } from '@/features/auth/modules/getJwtFromCookie'
import { timelineApi } from '@instagram-like-app/http-client'
import { useInfiniteQuery } from '@tanstack/react-query'

export const TIMELINE_QUERY_KEY = ['getTimeline'] as const

export const useGetTimeline = () => {
  const jwt = getJwtFromCookie()

  return useInfiniteQuery({
    queryKey: TIMELINE_QUERY_KEY,
    queryFn: async ({ pageParam }) => {
      return await timelineApi
        .apiTimelineGet({ cursor: pageParam }, { headers: { Authorization: `Bearer ${jwt}` } })
        .catch(error => {
          console.error(error)
          throw new Error('タイムラインの取得に失敗しました。')
        })
    },
    initialPageParam: undefined as string | undefined,
    getNextPageParam: lastPage => {
      return lastPage.hasMore ? (lastPage.nextCursor ?? undefined) : undefined
    },
    enabled: !!jwt
  })
}
