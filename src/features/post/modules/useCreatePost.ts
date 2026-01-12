import { useMutation } from '@tanstack/react-query'
import type { UseMutationResult } from '@tanstack/react-query'
import { postApi, type ApiPostsGet200ResponseInner } from '@instagram-like-app/http-client'
import { getJwtFromCookie } from '@/features/auth/modules/getJwtFromCookie'

type CreatePostParams = {
  images: File[]
  caption?: string
}

export const useCreatePost = (): UseMutationResult<ApiPostsGet200ResponseInner, Error, CreatePostParams, unknown> => {
  const jwt = getJwtFromCookie()

  return useMutation<ApiPostsGet200ResponseInner, Error, CreatePostParams>({
    mutationFn: async ({ images, caption }) => {
      if (!jwt) {
        throw new Error('認証情報がありません。')
      }

      const formData = new FormData()
      images.forEach(file => formData.append('images[]', file))
      if (caption?.trim()) {
        formData.append('caption', caption.trim())
      }

      const response = await postApi.apiPostsPostRaw({
        headers: { Authorization: `Bearer ${jwt}` },
        body: formData
      })

      return await response.value()
    }
  })
}
