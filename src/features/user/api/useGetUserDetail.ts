import { getJwtFromCookie } from '@/features/auth/modules/getJwtFromCookie'
import { userApi } from '@instagram-like-app/http-client'
import { useQuery } from '@tanstack/react-query'

export const useGetUserDetail = (userId: number | undefined) => {
  const jwt = getJwtFromCookie()

  const { data, isLoading, error } = useQuery({
    queryKey: ['getUserDetail', userId],
    queryFn: async () => {
      return await userApi.apiUsersIdGet({ id: userId! }, { headers: { Authorization: `Bearer ${jwt}` } })
    },
    enabled: !!jwt && userId !== undefined
  })

  return { data, isLoading, error }
}
