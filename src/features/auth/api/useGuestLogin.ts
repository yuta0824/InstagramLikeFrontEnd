import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { authApi } from '@instagram-like-app/http-client'

const setJwtCookie = (jwt: string, exp: number) => {
  const currentTime = Math.floor(Date.now() / 1000)
  const maxAge = Math.max(exp - currentTime, 0)
  const secureFlag = window.location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `jwt=${jwt}; Max-Age=${maxAge}; SameSite=Strict; Path=/${secureFlag}`
}

export const useGuestLogin = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: () => authApi.apiAuthGuestSessionPost(),
    onSuccess: data => {
      setJwtCookie(data.jwt, data.exp)
      router.push('/home')
    },
    onError: () => {
      toast.error('ゲストログインに失敗しました。')
    }
  })
}
