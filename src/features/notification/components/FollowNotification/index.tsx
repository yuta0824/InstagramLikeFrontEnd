'use client'

import Link from 'next/link'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { IoPersonCircle } from 'react-icons/io5'

interface NotificationUser {
  name: string
  username?: string
  avatarUrl?: string
}

export interface FollowNotificationProps {
  users: NotificationUser[]
  totalCount?: number
  timeAgo: string
}

export const FollowNotification = ({ users, totalCount, timeAgo }: FollowNotificationProps) => {
  if (users.length === 0) return null

  const userProfileUrl = (username?: string) => (username ? `/account/${username}` : '#')
  const displayUsers = users.slice(0, 2)
  const othersCount = Math.max((totalCount ?? users.length) - displayUsers.length, 0)
  const namesText = displayUsers.map(user => user.name).join('、')

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-1">
        {users.map((user, index) => (
          <Link key={index} href={userProfileUrl(user.username)} className="inline-block">
            <Avatar className="size-10">
              {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt={`${user.name}のアバター`} />}
              <AvatarFallback className="border border-gray-400">
                <IoPersonCircle className="size-10 text-gray-400" />
              </AvatarFallback>
            </Avatar>
          </Link>
        ))}
      </div>

      <div className="space-y-1">
        <p className="text-foreground text-sm leading-snug">
          <span className="font-semibold">{namesText}</span>
          {othersCount > 0 && <span className="font-semibold">、他{othersCount}名</span>}
          <span className="text-muted-foreground"> があなたをフォローしました。</span>
        </p>
        <p className="text-muted-foreground text-xs">{timeAgo}</p>
      </div>
    </div>
  )
}
