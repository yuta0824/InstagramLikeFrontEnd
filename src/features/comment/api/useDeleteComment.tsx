import { useMutation } from '@tanstack/react-query'
import type { UseMutationResult } from '@tanstack/react-query'
import { commentApi } from '@instagram-like-app/http-client'
import { getJwtFromCookie } from '@/features/auth/modules/getJwtFromCookie'

type DeleteCommentParams = {
  postId: number
  commentId: number
}

export const useDeleteComment = (): UseMutationResult<void, Error, DeleteCommentParams, unknown> => {
  const jwt = getJwtFromCookie()

  return useMutation<void, Error, DeleteCommentParams>({
    mutationFn: async ({ postId, commentId }) => {
      if (!jwt) {
        throw new Error('認証情報がありません。')
      }

      const response = await commentApi.apiPostsPostIdCommentsIdDeleteRaw(
        { postId, id: commentId },
        async ({ init }) => ({
          ...init,
          headers: { ...init.headers, Authorization: `Bearer ${jwt}` }
        })
      )

      return await response.value()
    }
  })
}
