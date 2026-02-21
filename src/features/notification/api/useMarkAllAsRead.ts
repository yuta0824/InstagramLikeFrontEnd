import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { UseMutationResult } from '@tanstack/react-query'
import { notificationApi } from '@instagram-like-app/http-client'
import { getJwtFromCookie } from '@/features/auth/modules/getJwtFromCookie'

export const useMarkAllAsRead = (): UseMutationResult<void, Error, void, unknown> => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, void>({
    mutationFn: async () => {
      const jwt = getJwtFromCookie()
      if (!jwt) {
        throw new Error('認証情報がありません。')
      }

      const authOverride = async ({ init }: { init: RequestInit }) => ({
        ...init,
        headers: { ...init.headers, Authorization: `Bearer ${jwt}` }
      })

      await notificationApi.apiNotificationsReadAllPostRaw(authOverride)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getNotifications'] })
      queryClient.invalidateQueries({ queryKey: ['getUnreadCount'] })
    }
  })
}
