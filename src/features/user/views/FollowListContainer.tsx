'use client'

import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useGetFollowers } from '../api/useGetFollowers'
import { useGetFollowings } from '../api/useGetFollowings'
import { useToggleFollow } from '../api/useToggleFollow'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { UserListDialog } from '../components/UserListDialog'

interface FollowListContainerProps {
  userId: number
  type: 'followers' | 'followings'
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const FollowListContainer = ({ userId, type, open, onOpenChange }: FollowListContainerProps) => {
  const followersQuery = useGetFollowers(type === 'followers' ? userId : undefined)
  const followingsQuery = useGetFollowings(type === 'followings' ? userId : undefined)
  const query = type === 'followers' ? followersQuery : followingsQuery
  const toggleFollowMutation = useToggleFollow()
  const queryClient = useQueryClient()
  const [pendingUserId, setPendingUserId] = useState<number | null>(null)

  const handleToggleFollow = (targetUserId: number, shouldFollow: boolean) => {
    if (toggleFollowMutation.isPending) return
    setPendingUserId(targetUserId)
    toggleFollowMutation.mutate(
      { userId: targetUserId, shouldFollow },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['getFollowers', userId] })
          queryClient.invalidateQueries({ queryKey: ['getFollowings', userId] })
          queryClient.invalidateQueries({ queryKey: ['getUserDetail', userId] })
        },
        onError: error => {
          console.error(error)
          toast.error('フォローの更新に失敗しました。')
        },
        onSettled: () => {
          setPendingUserId(null)
        }
      }
    )
  }

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = query

  const sentinelRef = useIntersectionObserver({
    onIntersect: () => fetchNextPage(),
    enabled: !!hasNextPage && !isFetchingNextPage
  })

  const allUsers = data?.pages.flat() ?? []
  const title = type === 'followers' ? 'フォロワー' : 'フォロー中'

  return (
    <UserListDialog
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      users={allUsers.map(user => ({
        id: user.id,
        name: user.name,
        avatarUrl: user.avatarUrl ?? undefined,
        accountUrl: `/accounts/${user.name}`,
        isFollowing: user.isFollowing,
        isPending: pendingUserId === user.id,
        onToggleFollow: handleToggleFollow
      }))}
      isLoading={isLoading}
      isError={isError}
      isFetchingNextPage={isFetchingNextPage}
      sentinelRef={sentinelRef}
    />
  )
}
