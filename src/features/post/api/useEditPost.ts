import { useMutation } from '@tanstack/react-query'
import type { UseMutationResult } from '@tanstack/react-query'
import { postApi, type ApiPostsGet200ResponseInner, type ApiPostsIdPatchRequest } from '@instagram-like-app/http-client'
import { getJwtFromCookie } from '@/features/auth/modules/getJwtFromCookie'

type EditPostParams = {
  id: number
  caption?: string
}

export const useEditPost = (): UseMutationResult<ApiPostsGet200ResponseInner, Error, EditPostParams, unknown> => {
  const jwt = getJwtFromCookie()

  return useMutation<ApiPostsGet200ResponseInner, Error, EditPostParams>({
    mutationFn: async ({ id, caption }) => {
      if (!jwt) {
        throw new Error('認証情報がありません。')
      }

      const payload: ApiPostsIdPatchRequest = {
        post: {
          caption: caption?.trim()
        }
      }

      const response = await postApi.apiPostsIdPatchRaw(
        {
          id,
          apiPostsIdPatchRequest: payload
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
