import Link from 'next/link'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { GoPerson } from 'react-icons/go'

export interface UserMenuProps {
  name: string
  myPageUrl: string
  avatarUrl?: string
  onLogout: () => void
}

export function UserMenu({ name, myPageUrl, avatarUrl, onLogout }: UserMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-full items-center gap-2 overflow-hidden">
        <Avatar className="size-8 shrink-0">
          {avatarUrl && <AvatarImage src={avatarUrl} alt={name} className="object-cover" />}
          <AvatarFallback className="border-brandGray/30 text-brandGray border">
            <GoPerson className="size-5" />
          </AvatarFallback>
        </Avatar>
        <div className="hidden min-w-0 flex-1 flex-col text-left xl:flex">
          <span className="truncate text-sm font-medium">{name}</span>
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
