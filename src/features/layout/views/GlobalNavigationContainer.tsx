'use client'

import { GlobalNavigation } from '@/components/layout/GlobalNavigation'
import { useLogout } from '@/features/auth/api/useLogout'
import { deleteJwtFromCookie } from '@/features/auth/modules/deleteJwtFromCookie'
import { useGetMe } from '@/features/user/api/useGetMe'
import { useRouter } from 'next/navigation'
import { useSetAtom } from 'jotai'
import { initialPostFormState, postFormStateAtom } from '@/features/post/states/postFormAtom'
import { SkeletonGlobalNavigation } from '@/components/layout/Skeleton/SkeletonGlobalNavigation'

export const GlobalNavigationContainer = () => {
  const { data, error, isLoading } = useGetMe()
  const { logoutMutation } = useLogout()
  const router = useRouter()
  const setPostFormState = useSetAtom(postFormStateAtom)
  if (!data || !logoutMutation || error) return null

  const name = data?.name
  const myPageUrl = `/accounts/${data?.name}`
  const handleLogout = () => {
    logoutMutation.mutate()
    deleteJwtFromCookie()
    router.push('/')
  }

  const handleCreatePost = () => {
    setPostFormState({
      ...initialPostFormState,
      isOpen: true
    })
  }

  return isLoading ? (
    <SkeletonGlobalNavigation />
  ) : (
    <GlobalNavigation name={name} myPageUrl={myPageUrl} onLogout={handleLogout} onCreatePost={handleCreatePost} />
  )
}
