import { useMutation } from '@tanstack/react-query'
import type { UseMutationResult } from '@tanstack/react-query'
import { likeApi, type ApiPostsPostIdLikePost200Response } from '@instagram-like-app/http-client'
import { getJwtFromCookie } from '@/features/auth/modules/getJwtFromCookie'

type ToggleLikeParams = {
  postId: number
  liked: boolean
}

export const useToggleLike = (): UseMutationResult<
  ApiPostsPostIdLikePost200Response,
  Error,
  ToggleLikeParams,
  unknown
> => {
  const jwt = getJwtFromCookie()

  return useMutation<ApiPostsPostIdLikePost200Response, Error, ToggleLikeParams>({
    mutationFn: async ({ postId, liked }) => {
      if (!jwt) {
        throw new Error('認証情報がありません。')
      }

      const authOverride = async ({ init }: { init: RequestInit }) => ({
        ...init,
        headers: { ...init.headers, Authorization: `Bearer ${jwt}` }
      })

      const response = liked
        ? await likeApi.apiPostsPostIdLikePostRaw({ postId }, authOverride)
        : await likeApi.apiPostsPostIdLikeDeleteRaw({ postId }, authOverride)
      return await response.value()
    }
  })
}
