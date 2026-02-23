import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { authApi } from '@instagram-like-app/http-client'
import { setJwtCookie } from '../modules/setJwtCookie'

export const useGuestLogin = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: () => authApi.apiAuthGuestSessionPost(),
    onSuccess: data => {
      setJwtCookie(data.jwt, data.exp)
      router.push('/home')
    },
    onError: error => {
      console.error('ゲストログインに失敗しました:', error)
      toast.error('ゲストログインに失敗しました。')
    }
  })
}
