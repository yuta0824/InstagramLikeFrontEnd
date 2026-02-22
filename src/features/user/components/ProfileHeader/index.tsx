import { Avatar, AvatarImage, DefaultAvatarFallback } from '@/components/ui/avatar'
import { ProfileStats, ProfileStatItemProps } from '../ProfileStats'

interface ProfileHeaderProps {
  avatarUrl?: string
  userName?: string
  isCurrentUser: boolean
  stats: {
    posts: ProfileStatItemProps
    followers: ProfileStatItemProps
    followings: ProfileStatItemProps
  }
}

export const ProfileHeader = ({ avatarUrl, userName, stats }: ProfileHeaderProps) => {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <Avatar className="mx-auto size-20">
          {avatarUrl && (
            <AvatarImage
              src={avatarUrl}
              alt={userName ? `${userName}のアバター` : 'ユーザーアバター'}
              width={80}
              height={80}
              className="aspect-square object-cover"
            />
          )}
          <DefaultAvatarFallback />
        </Avatar>
      </div>
      <ProfileStats {...stats} />
    </div>
  )
}
