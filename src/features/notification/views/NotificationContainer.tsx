'use client'

import { useEffect, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { PageHeader } from '@/components/layout/PageHeader'
import { LoadingError } from '@/components/layout/LoadingError'
import { SkeletonUserList } from '@/components/ui/Skeleton/SkeletonUserList'
import { Spinner } from '@/components/ui/spinner'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { NotificationList } from '../components/NotificationList'
import { FollowNotification } from '../components/FollowNotification'
import { LikeNotification } from '../components/LikeNotification'
import { CommentNotification } from '../components/CommentNotification'
import { useGetNotifications } from '../api/useGetNotifications'
import { useMarkAllAsRead } from '../api/useMarkAllAsRead'
import { useGetUnreadCount } from '../api/useGetUnreadCount'
import type { ApiNotificationsGet200ResponseInner } from '@instagram-like-app/http-client'

const toUsers = (actors: ApiNotificationsGet200ResponseInner['recentActors']) =>
  actors.map(actor => ({ name: actor.name, avatarUrl: actor.avatarUrl ?? undefined }))

const renderNotificationItem = (notification: ApiNotificationsGet200ResponseInner): ReactNode => {
  switch (notification.notificationType) {
    case 'followed':
      return (
        <FollowNotification
          users={toUsers(notification.recentActors)}
          totalCount={notification.actorCount}
          timeAgo={notification.timeAgo}
        />
      )
    case 'liked':
      return (
        <LikeNotification
          users={toUsers(notification.recentActors)}
          totalCount={notification.actorCount}
          timeAgo={notification.timeAgo}
          postThumbnailUrl={notification.postImageUrl ?? ''}
          postUrl={`/posts/${notification.postId}`}
        />
      )
    case 'commented':
      return (
        <CommentNotification
          user={toUsers(notification.recentActors)[0] ?? { name: '' }}
          timeAgo={notification.timeAgo}
          comment={notification.commentContent ?? ''}
          postThumbnailUrl={notification.postImageUrl ?? ''}
          postUrl={`/posts/${notification.postId}`}
        />
      )
    default:
      return null
  }
}

export const NotificationContainer = () => {
  const router = useRouter()
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetNotifications()
  const markAllAsRead = useMarkAllAsRead()
  const { data: unreadData } = useGetUnreadCount()

  const sentinelRef = useIntersectionObserver({
    onIntersect: () => fetchNextPage(),
    enabled: !!hasNextPage && !isFetchingNextPage
  })

  useEffect(() => {
    if (unreadData && unreadData.unreadCount > 0) {
      markAllAsRead.mutate()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading) {
    return (
      <div className="space-y-4">
        <PageHeader title="通知" onBack={() => router.back()} />
        <SkeletonUserList />
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-4">
        <PageHeader title="通知" onBack={() => router.back()} />
        <LoadingError />
      </div>
    )
  }

  const allNotifications = data?.pages.flat() ?? []

  if (allNotifications.length === 0) {
    return (
      <div className="space-y-4">
        <PageHeader title="通知" onBack={() => router.back()} />
        <p className="text-muted-foreground py-10 text-center text-sm">通知はまだありません。</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <PageHeader title="通知" onBack={() => router.back()} />
      <NotificationList>
        {allNotifications.map(notification => (
          <div key={notification.id}>{renderNotificationItem(notification)}</div>
        ))}
      </NotificationList>
      <div ref={sentinelRef} className="h-4" />
      {isFetchingNextPage && (
        <div className="flex justify-center py-4">
          <Spinner className="size-6" />
        </div>
      )}
    </div>
  )
}
