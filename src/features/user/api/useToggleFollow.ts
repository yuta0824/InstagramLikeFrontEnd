import { useMutation } from '@tanstack/react-query'
import type { UseMutationResult } from '@tanstack/react-query'
import { relationshipApi } from '@instagram-like-app/http-client'
import { getJwtFromCookie } from '@/features/auth/modules/getJwtFromCookie'

type ToggleFollowParams = {
  userId: number
  shouldFollow: boolean
}

export const useToggleFollow = (): UseMutationResult<void, Error, ToggleFollowParams, unknown> => {
  return useMutation<void, Error, ToggleFollowParams>({
    mutationFn: async ({ userId, shouldFollow }) => {
      const jwt = getJwtFromCookie()
      if (!jwt) {
        throw new Error('認証情報がありません。')
      }

      const authOverride = async ({ init }: { init: RequestInit }) => ({
        ...init,
        headers: { ...init.headers, Authorization: `Bearer ${jwt}` }
      })

      if (shouldFollow) {
        await relationshipApi.apiUsersUserIdRelationshipPost({ userId }, authOverride)
      } else {
        await relationshipApi.apiUsersUserIdRelationshipDelete({ userId }, authOverride)
      }
    }
  })
}
