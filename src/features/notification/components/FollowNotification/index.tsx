'use client'

import Link from 'next/link'
import { Avatar, AvatarImage, DefaultAvatarFallback } from '@/components/ui/avatar'

interface NotificationUser {
  name: string
  avatarUrl?: string
}

export interface FollowNotificationProps {
  users: NotificationUser[]
  totalCount?: number
  timeAgo: string
}

export const FollowNotification = ({ users, totalCount, timeAgo }: FollowNotificationProps) => {
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

      <div className="space-y-1">
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
          <span className="text-muted-foreground"> があなたをフォローしました。</span>
        </p>
        <p className="text-muted-foreground text-xs">{timeAgo}</p>
      </div>
    </div>
  )
}
