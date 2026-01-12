import { getJwtFromCookie } from '@/features/auth/modules/getJwtFromCookie'
import { postApi } from '@instagram-like-app/http-client'
import { useQuery } from '@tanstack/react-query'

export const useGetPosts = () => {
  const jwt = getJwtFromCookie()

  const fetchGetPosts = async () => {
    return await postApi
      .apiPostsGet({
        headers: { Authorization: `Bearer ${jwt}` }
      })
      .catch(error => {
        console.error(error)
        throw new Error('投稿の取得に失敗しました。')
      })
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ['getPosts'],
    queryFn: fetchGetPosts,
    enabled: !!jwt
  })

  return {
    data,
    isLoading,
    error
  }
}
