'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { AvatarUpload } from '@/components/ui/AvatarUpload'
import { ProfileStats, ProfileStatItemProps } from '../ProfileStats'
import { GoPerson } from 'react-icons/go'

interface ProfileHeaderProps {
  avatarUrl?: string
  userName?: string
  isCurrentUser: boolean
  stats: {
    posts: ProfileStatItemProps
    followers: ProfileStatItemProps
    followings: ProfileStatItemProps
  }
  onFileChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const ProfileHeader = ({ avatarUrl, userName, isCurrentUser, stats, onFileChange }: ProfileHeaderProps) => {
  return (
    <div className="space-y-4">
      <div className="text-center">
        {isCurrentUser && onFileChange ? (
          <AvatarUpload avatarUrl={avatarUrl} userName={userName} onFileChange={onFileChange} />
        ) : (
          <Avatar className="mx-auto size-20 border border-red-500 p-1">
            {avatarUrl && (
              <AvatarImage
                src={avatarUrl}
                alt={userName ? `${userName}のアバター` : 'ユーザーアバター'}
                width={80}
                height={80}
                className="aspect-square object-cover"
              />
            )}
            <AvatarFallback className="border-brandGray/30 text-brandGray border">
              <GoPerson className="size-16" />
            </AvatarFallback>
          </Avatar>
        )}
      </div>
      <ProfileStats {...stats} />
    </div>
  )
}
