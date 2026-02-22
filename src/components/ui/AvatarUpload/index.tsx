'use client'

import { Avatar, AvatarImage, DefaultAvatarFallback } from '@/components/ui/avatar'

interface AvatarUploadProps {
  avatarUrl?: string
  userName?: string
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const AvatarUpload = ({ avatarUrl, userName, onFileChange }: AvatarUploadProps) => {
  return (
    <label className="inline-block cursor-pointer">
      <Avatar className="size-20">
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
      <input type="file" accept="image/*" className="hidden" onChange={onFileChange} />
    </label>
  )
}
