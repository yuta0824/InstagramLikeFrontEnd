import { getJwtFromCookie } from '@/features/auth/modules/getJwtFromCookie'
import { postApi } from '@instagram-like-app/http-client'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

export const useGetPostDetail = (postId: number | null) => {
  const jwt = getJwtFromCookie()

  return useQuery({
    queryKey: ['getPostDetail', postId],
    queryFn: async () => {
      return await postApi
        .apiPostsIdGet(
          { id: postId! },
          {
            headers: { Authorization: `Bearer ${jwt}` }
          }
        )
        .catch(error => {
          console.error(error)
          throw new Error('投稿詳細の取得に失敗しました。')
        })
    },
    enabled: postId !== null && !!jwt,
    placeholderData: keepPreviousData
  })
}
