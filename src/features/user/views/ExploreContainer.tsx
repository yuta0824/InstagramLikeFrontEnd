'use client'

import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { IoSearchOutline } from 'react-icons/io5'
import { toast } from 'sonner'
import { SkeletonUserList } from '@/components/ui/Skeleton/SkeletonUserList'
import { LoadingError } from '@/components/layout/LoadingError'
import { PageHeader } from '@/components/layout/PageHeader'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { useDebounce } from '@/hooks/useDebounce'
import { useExploreUsers } from '../api/useExploreUsers'
import { useToggleFollow } from '../api/useToggleFollow'
import { UserList } from '../components/UserList'
import { UserListContainer } from './UserListContainer'

export const ExploreContainer = () => {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query)
  const { data, isLoading, error } = useExploreUsers(debouncedQuery)
  const toggleFollowMutation = useToggleFollow()
  const queryClient = useQueryClient()
  const [pendingUserId, setPendingUserId] = useState<number | null>(null)

  const handleToggleFollow = (userId: number, shouldFollow: boolean) => {
    if (toggleFollowMutation.isPending) return
    setPendingUserId(userId)
    toggleFollowMutation.mutate(
      { userId, shouldFollow },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['exploreUsers'] })
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

  const isDebouncing = query !== debouncedQuery && query.length > 0

  const renderContent = () => {
    if (!query) {
      return (
        <div className="mt-10">
          <hr className="py-4" />
          <UserListContainer />
        </div>
      )
    }
    if (isDebouncing || isLoading) {
      return <SkeletonUserList />
    }
    if (error) {
      return <LoadingError />
    }
    if (!data || data.length === 0) {
      return <p className="text-muted-foreground py-10 text-center text-sm">該当するユーザーが見つかりません。</p>
    }
    return (
      <UserList
        users={data.map(user => ({
          id: user.id,
          name: user.name,
          avatarUrl: user.avatarUrl ?? undefined,
          accountUrl: `/accounts/${user.name}`,
          isFollowing: user.isFollowing,
          isPending: pendingUserId === user.id,
          onToggleFollow: handleToggleFollow
        }))}
      />
    )
  }

  return (
    <div className="space-y-4">
      <PageHeader title="検索" onBack={() => router.back()} />
      <InputGroup>
        <InputGroupAddon>
          <IoSearchOutline />
        </InputGroupAddon>
        <InputGroupInput placeholder="ユーザーを検索..." value={query} onChange={e => setQuery(e.target.value)} />
      </InputGroup>
      {renderContent()}
    </div>
  )
}
