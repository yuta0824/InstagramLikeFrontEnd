'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Avatar, AvatarImage, DefaultAvatarFallback } from '@/components/ui/avatar'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { LikeButton } from '@/components/ui/LikeButton'
import { ShareButton } from '@/components/ui/ShareButton'
import { CommentItem, CommentItemProps } from '@/features/comment/components/CommentItem'
import { Spinner } from '@/components/ui/spinner'
import { IoEllipsisHorizontal } from 'react-icons/io5'
import { CommentField } from '@/features/comment/components/CommentField'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

export interface PostDetailViewProps {
  post: {
    id: string
    imageUrls: string[]
    user: {
      name: string
      avatarUrl?: string
    }
    caption: string
    likes: number
    isLiked: boolean
    isOwn: boolean
  }
  comments: CommentItemProps[]
  shareUrl: string
  onLike: (liked: boolean) => void
  onEdit?: () => void
  onDelete?: () => void
  commentValue: string
  onCommentValueChange: (value: string) => void
  onCommentSubmit: () => void
  commentError: string
  timeAgo: string
  isLoadingComments?: boolean
}

export const PostDetailView = ({
  post,
  comments,
  shareUrl,
  onLike,
  onEdit,
  onDelete,
  commentValue,
  onCommentValueChange,
  onCommentSubmit,
  commentError,
  timeAgo,
  isLoadingComments
}: PostDetailViewProps) => {
  return (
    <div className="grid grid-cols-1 gap-0 overflow-auto border md:grid-cols-2 md:overflow-visible">
      {/* 画像 */}
      <div className="bg-black">
        {post.imageUrls.length <= 1 ? (
          post.imageUrls[0] ? (
            <div className="relative h-100 md:h-[90vh] md:max-h-[500px]">
              <Image
                src={post.imageUrls[0]}
                alt={post.caption || '投稿画像'}
                unoptimized
                fill
                className="object-contain"
              />
            </div>
          ) : null
        ) : (
          <Carousel>
            <CarouselContent>
              {post.imageUrls.map((url, index) => (
                <CarouselItem key={index}>
                  <div className="relative h-100 md:h-[90vh] md:max-h-[500px]">
                    <Image
                      src={url}
                      alt={post.caption ? `${post.caption} - ${index + 1}` : `投稿画像 ${index + 1}`}
                      unoptimized
                      fill
                      className="object-contain"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <>
              <CarouselPrevious className="left-2 size-6" />
              <CarouselNext className="right-2 size-6" />
            </>
          </Carousel>
        )}
      </div>

      {/* 投稿情報 */}
      <div className="flex h-100 flex-col md:h-[90vh] md:max-h-[500px]">
        {/* ヘッダー */}
        <header className="border-b border-gray-200 p-4">
          <div className="flex items-center justify-between gap-1">
            <div className="flex items-center gap-2">
              <Link href={`/accounts/${post.user.name}`} className="flex items-center gap-2">
                <Avatar className="size-10">
                  {post.user.avatarUrl && <AvatarImage src={post.user.avatarUrl} alt={post.user.name} />}
                  <DefaultAvatarFallback />
                </Avatar>
              </Link>
              <div className="flex flex-col gap-1">
                <Link className="font-base font-semibold" href={`/accounts/${post.user.name}`}>
                  {post.user.name}
                </Link>
                {timeAgo && <p className="text-brandGray text-xs">{timeAgo}</p>}
              </div>
            </div>
            {post.isOwn && (onEdit || onDelete) && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="size-8">
                    <IoEllipsisHorizontal className="size-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {onEdit && <DropdownMenuItem onClick={onEdit}>編集</DropdownMenuItem>}
                  {onDelete && (
                    <DropdownMenuItem onClick={onDelete} className="text-red-500!">
                      削除
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem>キャンセル</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </header>

        {/* コメント一覧 */}
        <div className="flex-1 space-y-2 overflow-y-auto bg-white p-4">
          {post.caption && <CommentItem userName={post.user.name} content={post.caption} />}
          {isLoadingComments ? (
            <div className="flex justify-center py-4">
              <Spinner className="size-6" />
            </div>
          ) : (
            comments.map((comment, index) => (
              <CommentItem
                key={index}
                userName={comment.userName}
                userAvatar={comment.userAvatar}
                content={comment.content}
                isOwner={comment.isOwner}
                onDelete={comment.onDelete}
              />
            ))
          )}
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
    </div>
  )
}
