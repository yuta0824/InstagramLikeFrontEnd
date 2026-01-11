'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { GoPerson } from 'react-icons/go'

interface AvatarUploadProps {
  avatarUrl?: string
  userName?: string
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const AvatarUpload = ({ avatarUrl, userName, onFileChange }: AvatarUploadProps) => {
  return (
    <label className="inline-block cursor-pointer">
      <Avatar className="size-20 border border-red-500 p-1">
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
      <input type="file" accept="image/*" className="hidden" onChange={onFileChange} />
    </label>
  )
}
