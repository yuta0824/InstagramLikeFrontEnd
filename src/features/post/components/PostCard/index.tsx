'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { LikeButton } from '@/components/ui/LikeButton'
import { CommentButton } from '@/components/ui/CommentButton'
import { ShareButton } from '@/components/ui/ShareButton'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MoreVertical, Pencil, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PostCardProps {
  id: string
  user: {
    name: string
    avatarUrl?: string
    accountUrl: string
  }
  currentUser: {
    isLiked: boolean
    isOwner: boolean
  }
  images: string[]
  caption: string
  timeAgo: string
  likesCount: number
  commentsCount: number
  onLike: (liked: boolean) => void
  onComment: () => void
  onEdit?: () => void
  onDelete?: () => void
  shareUrl: string
}

export const PostCard = ({
  id,
  user,
  currentUser,
  images,
  caption,
  timeAgo,
  likesCount,
  commentsCount,
  onLike,
  onComment,
  onEdit,
  onDelete,
  shareUrl
}: PostCardProps) => {
  return (
    <div className="max-w-sm space-y-3" id={id}>
      <div className="flex items-center gap-3">
        <Link href={user.accountUrl}>
          <Avatar className="size-10">
            {user.avatarUrl && (
              <AvatarImage src={user.avatarUrl} alt={`${user.name}のアバター`} width={40} height={40} />
            )}
            <AvatarFallback>
              <Image src="/icon_avatar-default.png" alt="デフォルトアバター" width={40} height={40} />
            </AvatarFallback>
          </Avatar>
        </Link>
        <div>
          <Link href={user.accountUrl}>
            <p className="text-sm">{user.name}</p>
          </Link>
          <p className="text-brandGray text-xs">{timeAgo}</p>
        </div>
        {currentUser.isOwner && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-auto rounded-full" aria-label="投稿メニュー">
                <MoreVertical className="size-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-md">
              {onEdit && (
                <DropdownMenuItem className="cursor-pointer text-inherit" onSelect={onEdit}>
                  <Pencil className="size-4 shrink-0 text-inherit" aria-hidden="true" />
                  <span>編集</span>
                </DropdownMenuItem>
              )}
              {onDelete && (
                <DropdownMenuItem className="cursor-pointer text-red-500!" onSelect={onDelete}>
                  <Trash2 className="size-4 shrink-0 text-red-500" aria-hidden="true" />
                  <span>削除</span>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      <div
        className={cn(
          'auto-rows-fr gap-2',
          images.length === 2 && 'grid grid-cols-2',
          images.length >= 3 && 'grid grid-cols-3'
        )}
      >
        {images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt=""
            width={468}
            height={468}
            className={cn('h-full w-full object-cover', images.length >= 3 && index === 0 && 'col-span-2 row-span-2')}
          />
        ))}
      </div>

      <div className="space-y-1">
        <p className="text-xs">
          <span className="pr-1 font-medium">{user.name}</span>
          <span>{caption}</span>
        </p>
      </div>

      <div className="flex w-full gap-3">
        <LikeButton liked={currentUser.isLiked} count={likesCount} onToggle={onLike} />
        <CommentButton count={commentsCount} onClick={onComment} />
        <ShareButton url={shareUrl} />
      </div>
    </div>
  )
}
