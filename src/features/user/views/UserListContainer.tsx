'use client'

import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { SkeletonUserList } from '@/components/ui/Skeleton/SkeletonUserList'
import { LoadingError } from '@/components/layout/LoadingError'
import { useGetActiveUsers } from '../api/useGetActiveUsers'
import { useToggleFollow } from '../api/useToggleFollow'
import { UserList } from '../components/UserList'

const SectionHeading = () => <p className="text-muted-foreground text-sm font-semibold">最近投稿したユーザー</p>

export const UserListContainer = () => {
  const { data, isLoading, error } = useGetActiveUsers()
  const toggleFollowMutation = useToggleFollow()
  const queryClient = useQueryClient()
  const [pendingUserId, setPendingUserId] = useState<number | null>(null)

  if (isLoading) {
    return (
      <div>
        <SectionHeading />
        <SkeletonUserList />
      </div>
    )
  }
  if (error) {
    return (
      <div>
        <SectionHeading />
        <LoadingError />
      </div>
    )
  }
  if (!data || data.length === 0) {
    return (
      <div className="space-y-3">
        <SectionHeading />
        <p className="text-muted-foreground py-10 text-sm">アクティブなユーザーがいません。</p>
      </div>
    )
  }

  const handleToggleFollow = (userId: number, shouldFollow: boolean) => {
    if (toggleFollowMutation.isPending) return
    setPendingUserId(userId)
    toggleFollowMutation.mutate(
      { userId, shouldFollow },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['getActiveUsers'] })
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

  return (
    <div className="space-y-3">
      <SectionHeading />
      <UserList
        users={data.map(user => ({
          id: user.id,
          name: user.name,
          avatarUrl: user.avatarUrl ?? undefined,
          isFollowing: user.isFollowing,
          isPending: pendingUserId === user.id,
          onToggleFollow: handleToggleFollow
        }))}
      />
    </div>
  )
}
