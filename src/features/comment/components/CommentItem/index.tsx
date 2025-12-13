import Link from 'next/link'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { IoPersonCircle, IoEllipsisHorizontal } from 'react-icons/io5'

export interface CommentItemProps {
  user: {
    username: string
    name: string
    avatarUrl?: string
  }
  content: string
  isCurrentUser?: boolean
  onDelete?: () => void
}

export const CommentItem = ({ user, content, isCurrentUser, onDelete }: CommentItemProps) => {
  return (
    <div className="mb-3 flex gap-3">
      <Link href={`/account/${user.username}`}>
        <Avatar className="size-8">
          {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.name} />}
          <AvatarFallback>
            <IoPersonCircle className="size-8 text-gray-400" />
          </AvatarFallback>
        </Avatar>
      </Link>
      <div className="min-w-0 flex-1">
        <p className="text-sm">
          <Link href={`/account/${user.username}`} className="mr-2 font-semibold hover:text-gray-600">
            {user.username}
          </Link>
          <span className="word-break-word">{content}</span>
        </p>
      </div>
      {isCurrentUser && onDelete && (
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
