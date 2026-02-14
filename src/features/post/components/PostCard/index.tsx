'use client'

import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { LikeButton } from '@/components/ui/LikeButton'
import { CommentButton } from '@/components/ui/CommentButton'
import { ShareButton } from '@/components/ui/ShareButton'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MoreVertical, Pencil, Trash2 } from 'lucide-react'
import { GoPerson } from 'react-icons/go'
import { PostImageGrid } from '../PostImageGrid'

interface PostCardProps {
  id: string
  user: {
    name: string
    avatarUrl?: string
    accountUrl?: string
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
  const avatar = (
    <Avatar className="size-10">
      {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt={`${user.name}のアバター`} width={40} height={40} />}
      <AvatarFallback className="border-brandGray/40 text-brandGray border">
        <GoPerson className="size-6" />
      </AvatarFallback>
    </Avatar>
  )

  const userName = <p className="text-sm">{user.name}</p>

  return (
    <div className="max-w-sm space-y-3" id={id}>
      <div className="flex items-center gap-3">
        {user.accountUrl ? <Link href={user.accountUrl}>{avatar}</Link> : avatar}
        <div>
          {user.accountUrl ? <Link href={user.accountUrl}>{userName}</Link> : userName}
          <p className="text-brandGray text-xs">{timeAgo}</p>
        </div>
        {currentUser.isOwner && (onEdit || onDelete) && (
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

      <PostImageGrid imageUrls={images} />

      <div className="space-y-1">
        <p className="text-xs">
          <span className="pr-1 font-medium">{user.name}</span>
          <span>{caption}</span>
        </p>
        <div className="-ml-2 flex w-full gap-3">
          <div className="min-w-10">
            <LikeButton isLiked={currentUser.isLiked} count={likesCount} onToggle={onLike} />
          </div>
          <div className="min-w-10">
            <CommentButton count={commentsCount} onClick={onComment} />
          </div>
          <ShareButton url={shareUrl} />
        </div>
      </div>
    </div>
  )
}
