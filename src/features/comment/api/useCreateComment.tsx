import { useMutation } from '@tanstack/react-query'
import type { UseMutationResult } from '@tanstack/react-query'
import { commentApi, type ApiPostsPostIdCommentsPost201Response } from '@instagram-like-app/http-client'
import { getJwtFromCookie } from '@/features/auth/modules/getJwtFromCookie'

type CreateCommentParams = {
  postId: number
  content: string
}

export const useCreateComment = (): UseMutationResult<
  ApiPostsPostIdCommentsPost201Response,
  Error,
  CreateCommentParams,
  unknown
> => {
  const jwt = getJwtFromCookie()

  return useMutation<ApiPostsPostIdCommentsPost201Response, Error, CreateCommentParams>({
    mutationFn: async ({ postId, content }) => {
      if (!jwt) {
        throw new Error('認証情報がありません。')
      }

      const response = await commentApi.apiPostsPostIdCommentsPostRaw(
        {
          postId,
          apiPostsPostIdCommentsPostRequest: {
            comment: {
              content: content
            }
          }
        },
        async ({ init }) => ({
          ...init,
          headers: { ...init.headers, Authorization: `Bearer ${jwt}` }
        })
      )

      return await response.value()
    }
  })
}
