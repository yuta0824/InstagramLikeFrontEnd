'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Dialog, DialogContent, DialogTrigger, DialogClose } from '@/components/ui/dialog'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { LikeButton } from '@/components/ui/LikeButton'
import { ShareButton } from '@/components/ui/ShareButton'
import { CommentItem, CommentItemProps } from '@/features/comment/components/CommentItem'
import { IoPersonCircle, IoCloseCircle, IoEllipsisHorizontal } from 'react-icons/io5'
import { CommentField } from '@/features/comment/components/CommentField'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

interface PostShowDialogProps {
  trigger: React.ReactNode
  post: {
    id: string
    imageUrls: string[]
    user: {
      name: string
      username: string
      avatarUrl?: string
    }
    caption: string
    likes: number
    isLiked: boolean
    createdAt: string
  }
  comments: CommentItemProps[]
  shareUrl: string
  onLike: (liked: boolean) => void
  onEditPost?: () => void
  onDeletePost?: () => void
  commentValue?: string
  onCommentValueChange?: (value: string) => void
  onCommentSubmit?: () => void
  commentError?: string
  timeAgo?: string
}

export const PostShowDialog = ({
  trigger,
  post,
  comments,
  shareUrl,
  onLike,
  onEditPost,
  onDeletePost,
  commentValue,
  onCommentValueChange,
  onCommentSubmit,
  commentError,
  timeAgo
}: PostShowDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="grid max-h-[calc(100vh-2rem)] grid-cols-1 gap-0 overflow-auto rounded-none p-0 sm:max-w-4xl md:grid-cols-2 md:overflow-visible"
      >
        <DialogClose className="absolute top-0 right-0 z-50 text-white transition-opacity hover:opacity-70 md:-top-12">
          <IoCloseCircle className="size-8" />
          <span className="sr-only">Close</span>
        </DialogClose>

        {/* 画像カルーセル */}
        <div className="bg-black">
          <Carousel>
            <CarouselContent>
              {post.imageUrls.map((url, index) => (
                <CarouselItem key={index}>
                  <div className="relative h-100 md:h-[90vh] md:max-h-[500px]">
                    <Image src={url} alt={`${post.caption} - ${index + 1}`} fill className="object-contain" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {post.imageUrls.length > 1 && (
              <>
                <CarouselPrevious className="left-2 size-6" />
                <CarouselNext className="right-2 size-6" />
              </>
            )}
          </Carousel>
        </div>

        {/* 投稿情報 */}
        <div className="flex h-100 flex-col md:h-[90vh] md:max-h-[500px]">
          {/* ヘッダー */}
          <header className="border-b border-gray-200 p-4">
            <div className="flex items-center justify-between gap-1">
              <div className="flex items-center gap-2">
                <Link href={`/account/${post.user.username}`} className="flex items-center gap-2">
                  <Avatar className="size-10">
                    {post.user.avatarUrl && <AvatarImage src={post.user.avatarUrl} alt={post.user.name} />}
                    <AvatarFallback>
                      <IoPersonCircle className="size-10 text-gray-400" />
                    </AvatarFallback>
                  </Avatar>
                </Link>
                <div className="flex flex-col gap-1">
                  <Link className="font-base font-semibold" href={`/account/${post.user.username}`}>
                    {post.user.username}
                  </Link>
                  {timeAgo && <p className="text-brandGray text-xs">{timeAgo}</p>}
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="size-8">
                    <IoEllipsisHorizontal className="size-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {onEditPost && <DropdownMenuItem onClick={onEditPost}>編集</DropdownMenuItem>}
                  {onDeletePost && (
                    <DropdownMenuItem onClick={onDeletePost} className="text-red-500!">
                      削除
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem>キャンセル</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* コメント一覧 */}
          <div className="flex-1 space-y-2 overflow-y-auto bg-white p-4">
            <CommentItem user={post.user} content={post.caption} />
            {comments.map((comment, index) => (
              <CommentItem key={index} {...comment} />
            ))}
          </div>

          {/* コメント入力 */}
          <div className="p-2">
            <CommentField
              value={commentValue}
              onChange={onCommentValueChange}
              onSubmit={onCommentSubmit || (() => {})}
              errorMessage={commentError || ''}
              isError={!!commentError}
              isDisabled={!commentValue?.trim()}
            />
          </div>

          {/* アクションボタン */}
          <div className="mt-auto border-t border-gray-200">
            <div className="flex gap-3 p-2">
              <LikeButton isLiked={post.isLiked} count={post.likes} onToggle={onLike} />
              <ShareButton url={shareUrl} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
