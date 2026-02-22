'use client'

import Link from 'next/link'
import { Avatar, AvatarImage, DefaultAvatarFallback } from '@/components/ui/avatar'
import { PostThumbnail } from '../PostThumbnail'

interface NotificationUser {
  name: string
  avatarUrl?: string
}

export interface CommentNotificationProps {
  user: NotificationUser
  timeAgo: string
  comment: string
  postId?: number
  postThumbnailUrl?: string
  postUrl: string
}

export const CommentNotification = ({
  user,
  timeAgo,
  comment,
  postId,
  postThumbnailUrl,
  postUrl
}: CommentNotificationProps) => {
  const userProfileUrl = `/accounts/${user.name}`

  return (
    <div className="flex flex-col gap-3">
      <Link href={userProfileUrl}>
        <Avatar className="size-10">
          {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt={`${user.name}のアバター`} />}
          <DefaultAvatarFallback />
        </Avatar>
      </Link>

      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1 space-y-1">
          <p className="text-foreground text-sm leading-snug">
            <Link href={userProfileUrl} className="font-semibold hover:underline">
              {user.name}
            </Link>
            <span className="text-muted-foreground"> さんがコメントしました</span>
          </p>
          <p className="text-foreground text-sm">{comment}</p>
          <p className="text-muted-foreground text-xs">{timeAgo}</p>
        </div>

        <PostThumbnail postId={postId} postThumbnailUrl={postThumbnailUrl} postUrl={postUrl} />
      </div>
    </div>
  )
}
