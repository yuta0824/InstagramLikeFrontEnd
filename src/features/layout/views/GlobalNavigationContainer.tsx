'use client'

import { GlobalNavigation } from '@/components/layout/GlobalNavigation'
import { useLogout } from '@/features/auth/api/useLogout'
import { deleteJwtFromCookie } from '@/features/auth/modules/deleteJwtFromCookie'
import { useGetMe } from '@/features/user/api/useGetMe'
import { useRouter } from 'next/navigation'
import { useSetAtom } from 'jotai'
import { initialPostFormState, postFormStateAtom } from '@/features/post/states/postFormAtom'
import { profileEditOpenAtom } from '@/features/user/states/profileEditAtom'
import { SkeletonGlobalNavigation } from '@/components/layout/Skeleton/SkeletonGlobalNavigation'
import { useGetUnreadCount } from '@/features/notification/api/useGetUnreadCount'

export const GlobalNavigationContainer = () => {
  const { data, error, isLoading } = useGetMe()
  const { logoutMutation } = useLogout()
  const { data: unreadData } = useGetUnreadCount()
  const router = useRouter()
  const setPostFormState = useSetAtom(postFormStateAtom)
  const setProfileEditOpen = useSetAtom(profileEditOpenAtom)
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

  const handleEditProfile = () => setProfileEditOpen(true)

  return isLoading ? (
    <SkeletonGlobalNavigation />
  ) : (
    <GlobalNavigation
      name={name}
      myPageUrl={myPageUrl}
      avatarUrl={data?.avatarUrl ?? undefined}
      unreadCount={unreadData?.unreadCount}
      onLogout={handleLogout}
      onCreatePost={handleCreatePost}
      onEditProfile={handleEditProfile}
    />
  )
}
