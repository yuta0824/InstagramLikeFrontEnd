import Link from 'next/link'
import { IoPersonCircle } from 'react-icons/io5'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

export interface UserMenuProps {
  name: string
  email: string
  myPageUrl: string
  avatarUrl?: string
  onLogout: () => void
}

export function UserMenu({ name, email, myPageUrl, avatarUrl, onLogout }: UserMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-full items-center gap-2 overflow-hidden">
        <Avatar className="size-8 shrink-0">
          {avatarUrl && <AvatarImage src={avatarUrl} alt={name} className="object-cover" />}
          <AvatarFallback>
            <IoPersonCircle className="size-8 text-gray-400" />
          </AvatarFallback>
        </Avatar>
        <div className="hidden min-w-0 flex-1 flex-col text-left lg:flex">
          <span className="truncate text-sm font-medium">{name}</span>
          <span className="truncate text-xs text-gray-500">{email}</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="text-sm">
        <DropdownMenuItem asChild>
          <Link href={myPageUrl}>マイページ</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onLogout} className="text-red-500">
          ログアウト
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
