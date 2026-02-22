'use client'

import Link from 'next/link'
import { Avatar, AvatarImage, DefaultAvatarFallback } from '@/components/ui/avatar'
import { PostThumbnail } from '../PostThumbnail'

interface NotificationUser {
  name: string
  avatarUrl?: string
}

export interface LikeNotificationProps {
  users: NotificationUser[]
  totalCount?: number
  timeAgo: string
  postId?: number
  postThumbnailUrl?: string
  postUrl: string
}

export const LikeNotification = ({ users, totalCount, timeAgo, postId, postThumbnailUrl, postUrl }: LikeNotificationProps) => {
  if (users.length === 0) return null

  const displayUsers = users.slice(0, 2)
  const othersCount = Math.max((totalCount ?? users.length) - displayUsers.length, 0)

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-1">
        {users.map((user, index) => (
          <Link key={index} href={`/accounts/${user.name}`} className="inline-block">
            <Avatar className="size-10">
              {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt={`${user.name}のアバター`} />}
              <DefaultAvatarFallback />
            </Avatar>
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1 space-y-1">
          <p className="text-foreground text-sm leading-snug">
            {displayUsers.map((user, index) => (
              <span key={index}>
                {index > 0 && '、'}
                <Link href={`/accounts/${user.name}`} className="font-semibold hover:underline">
                  {user.name}
                </Link>
              </span>
            ))}
            {othersCount > 0 && <span className="font-semibold">、他{othersCount}名</span>}
            <span className="text-muted-foreground"> があなたの投稿に「いいね！」しました。</span>
          </p>
          <p className="text-muted-foreground text-xs">{timeAgo}</p>
        </div>

        <PostThumbnail postId={postId} postThumbnailUrl={postThumbnailUrl} postUrl={postUrl} />
      </div>
    </div>
  )
}
