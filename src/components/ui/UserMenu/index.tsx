import Link from 'next/link'
import { Avatar, AvatarImage, DefaultAvatarFallback } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

export interface UserMenuProps {
  name: string
  myPageUrl: string
  avatarUrl?: string
  onLogout: () => void
  onEditProfile: () => void
}

export function UserMenu({ name, myPageUrl, avatarUrl, onLogout, onEditProfile }: UserMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-full items-center gap-2 overflow-hidden">
        <Avatar className="size-8 shrink-0">
          {avatarUrl && <AvatarImage src={avatarUrl} alt={name} className="object-cover" />}
          <DefaultAvatarFallback />
        </Avatar>
        <div className="hidden min-w-0 flex-1 flex-col text-left xl:flex">
          <span className="truncate text-sm font-medium">{name}</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="text-sm">
        <DropdownMenuItem asChild>
          <Link href={myPageUrl}>マイページ</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onEditProfile}>プロフィール編集</DropdownMenuItem>
        <DropdownMenuItem onClick={onLogout} className="text-red-500!">
          ログアウト
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
