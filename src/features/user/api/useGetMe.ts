import { ApiMeGet200Response, userApi } from '@instagram-like-app/http-client/src'
import { useQuery } from '@tanstack/react-query'

export const useGetMe = (): {
  data: ApiMeGet200Response | undefined
  isLoading: boolean
  error: unknown
} => {
  // TODO: Cookieから実際の値から取得する
  const jwt = 'jwt1234'
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
