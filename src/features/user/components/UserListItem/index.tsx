'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export interface UserListItemProps {
  name: string
  avatarUrl?: string
  accountUrl: string
  lastPostStatusMessage: string
}

export const UserListItem = ({ name, avatarUrl, accountUrl, lastPostStatusMessage }: UserListItemProps) => {
  return (
    <Link href={accountUrl}>
      <div className="border-b-brandGrayLight flex items-center gap-2 border-b py-4">
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
          <AvatarFallback>
            <Image src="/icon_avatar-default.png" alt="デフォルトアバター" width={32} height={32} />
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <p className="text-base">{name}</p>
          <p className="text-brandGray text-sm">{lastPostStatusMessage}</p>
        </div>
      </div>
    </Link>
  )
}
