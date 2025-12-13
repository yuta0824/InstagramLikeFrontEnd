'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { IoPersonCircle } from 'react-icons/io5'

interface NotificationUser {
  name: string
  username?: string
  avatarUrl?: string
}

export interface CommentNotificationProps {
  user: NotificationUser
  timeAgo: string
  comment: string
  postThumbnailUrl: string
  postUrl: string
}

export const CommentNotification = ({
  user,
  timeAgo,
  comment,
  postThumbnailUrl,
  postUrl
}: CommentNotificationProps) => {
  const userProfileUrl = user.username ? `/account/${user.username}` : '#'

  return (
    <div className="flex flex-col gap-3">
      <Link href={userProfileUrl}>
        <Avatar className="size-10">
          {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt={`${user.name}のアバター`} />}
          <AvatarFallback className="border border-gray-400">
            <IoPersonCircle className="size-10 text-gray-400" />
          </AvatarFallback>
        </Avatar>
      </Link>

      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1 space-y-1">
          <p className="text-foreground text-sm leading-snug">
            <span className="font-semibold">{user.name}</span>
            <span className="text-muted-foreground"> さんがコメントしました</span>
          </p>
          <p className="text-foreground text-sm">{comment}</p>
          <p className="text-muted-foreground text-xs">{timeAgo}</p>
        </div>

        <Link href={postUrl} className="relative h-12 w-12 overflow-hidden rounded-md">
          <Image src={postThumbnailUrl} alt="対象の投稿" fill className="object-cover" />
        </Link>
      </div>
    </div>
  )
}
