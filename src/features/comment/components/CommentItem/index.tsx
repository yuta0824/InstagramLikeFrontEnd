import Link from 'next/link'
import { Avatar, AvatarImage, DefaultAvatarFallback } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { IoEllipsisHorizontal } from 'react-icons/io5'

export interface CommentItemProps {
  userName: string
  userAvatar?: string
  content: string
  isOwner?: boolean
  onDelete?: () => void
}

export const CommentItem = ({ userName, userAvatar, content, isOwner, onDelete }: CommentItemProps) => {
  return (
    <div className="mb-3 flex gap-3">
      <Link href={`/account/${userName}`}>
        <Avatar className="size-8">
          {userAvatar && <AvatarImage src={userAvatar} alt={userName} />}
          <DefaultAvatarFallback />
        </Avatar>
      </Link>
      <div className="min-w-0 flex-1">
        <p className="text-sm">
          <Link href={`/account/${userName}`} className="mr-2 font-semibold hover:text-gray-600">
            {userName}
          </Link>
          <span className="word-break-word">{content}</span>
        </p>
      </div>
      {isOwner && onDelete && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-6">
              <IoEllipsisHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onDelete} className="text-red-500!">
              削除
            </DropdownMenuItem>
            <DropdownMenuItem>キャンセル</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
}
