'use client'

import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { GoPerson } from 'react-icons/go'
import { FollowButton } from '../FollowButton'

export interface UserListItemProps {
  id: number
  name: string
  avatarUrl?: string
  accountUrl?: string
  lastPostStatusMessage?: string
  isFollowing?: boolean
  isPending?: boolean
  onToggleFollow?: (id: number, shouldFollow: boolean) => void
}

export const UserListItem = ({
  id,
  name,
  avatarUrl,
  accountUrl,
  lastPostStatusMessage,
  isFollowing,
  isPending = false,
  onToggleFollow
}: UserListItemProps) => {
  const avatar = (
    <Avatar className="size-8">
      {avatarUrl && (
        <AvatarImage
          src={avatarUrl}
          alt={`${name}のアバター`}
          width={32}
          height={32}
          className="aspect-square object-cover"
        />
      )}
      <AvatarFallback className="border-brandGray/30 text-brandGray border">
        <GoPerson className="size-6" />
      </AvatarFallback>
    </Avatar>
  )

  const userInfo = (
    <div className="min-w-0 flex-1 space-y-1">
      <p className="truncate text-base">{name}</p>
      {lastPostStatusMessage && <p className="text-brandGray truncate text-sm">{lastPostStatusMessage}</p>}
    </div>
  )

  return (
    <div className="border-b-brandGrayLight flex items-center gap-2 border-b py-4">
      {accountUrl ? (
        <Link href={accountUrl} className="flex min-w-0 flex-1 items-center gap-2">
          {avatar}
          {userInfo}
        </Link>
      ) : (
        <>
          {avatar}
          {userInfo}
        </>
      )}
      {isFollowing !== undefined && onToggleFollow && (
        <FollowButton
          isFollowing={isFollowing}
          isPending={isPending}
          onClick={() => onToggleFollow(id, !isFollowing)}
        />
      )}
    </div>
  )
}
