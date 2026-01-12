import { useMutation } from '@tanstack/react-query'
import type { UseMutationResult } from '@tanstack/react-query'
import { postApi } from '@instagram-like-app/http-client'
import { getJwtFromCookie } from '@/features/auth/modules/getJwtFromCookie'

type DeletePostParams = {
  id: number
}

export const useDeletePost = (): UseMutationResult<void, Error, DeletePostParams, unknown> => {
  const jwt = getJwtFromCookie()

  return useMutation<void, Error, DeletePostParams>({
    mutationFn: async ({ id }) => {
      if (!jwt) {
        throw new Error('認証情報がありません。')
      }

      const response = await postApi.apiPostsIdDeleteRaw({ id }, async ({ init }) => ({
        ...init,
        headers: { ...init.headers, Authorization: `Bearer ${jwt}` }
      }))

      return await response.value()
    }
  })
}
