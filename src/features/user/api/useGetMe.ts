import { getJwtFromCookie } from '@/features/auth/modules/getJwtFromCookie'
import { ApiAccountsGet200ResponseInner, userApi } from '@instagram-like-app/http-client'
import { useQuery } from '@tanstack/react-query'

export const useGetMe = (): {
  data: ApiAccountsGet200ResponseInner | undefined
  isLoading: boolean
  error: unknown
} => {
  const jwt = getJwtFromCookie()
  const fetchGetMe = async () => {
    return await userApi
      .apiMeGet({
        headers: { Authorization: `Bearer ${jwt}` }
      })
      .catch(error => {
        console.error(error)
        throw new Error('Failed to fetch user profile.')
      })
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ['getMe'],
    queryFn: fetchGetMe,
    enabled: !!jwt
  })

  return {
    data,
    isLoading,
    error
  }
}
