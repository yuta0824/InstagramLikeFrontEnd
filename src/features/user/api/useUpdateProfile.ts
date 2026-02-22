import { useMutation } from '@tanstack/react-query'
import type { UseMutationResult } from '@tanstack/react-query'
import { userApi, type ApiMeGet200Response } from '@instagram-like-app/http-client'
import { getJwtFromCookie } from '@/features/auth/modules/getJwtFromCookie'

type UpdateProfileParams = {
  avatar?: File
  name?: string
  removeAvatar?: boolean
}

export const useUpdateProfile = (): UseMutationResult<ApiMeGet200Response, Error, UpdateProfileParams, unknown> => {
  return useMutation<ApiMeGet200Response, Error, UpdateProfileParams>({
    mutationFn: async params => {
      const jwt = getJwtFromCookie()
      if (!jwt) {
        throw new Error('認証情報がありません。ページを再読み込みしてください。')
      }

      const response = await userApi.apiMePatchRaw(
        { avatar: params.avatar, name: params.name, removeAvatar: params.removeAvatar },
        { headers: { Authorization: `Bearer ${jwt}` } }
      )

      return await response.value()
    }
  })
}
