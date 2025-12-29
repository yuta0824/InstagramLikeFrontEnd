import { useGetMe } from '@/features/user/api/useGetMe'
import { getJwtFromCookie } from '../modules/getJwtFromCookie'

export const useCheckAuth = () => {
  const jwt = getJwtFromCookie()
  const { error, isLoading } = useGetMe()
  const isSignedIn = !!jwt && !error

  return { isSignedIn, isLoading }
}
