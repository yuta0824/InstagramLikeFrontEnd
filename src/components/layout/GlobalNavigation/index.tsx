'use client'

import Link from 'next/link'
import { IoHomeOutline, IoSearchOutline, IoNotificationsOutline } from 'react-icons/io5'
import { MdOutlineAddBox } from 'react-icons/md'
import { UserMenu } from '@/components/ui/UserMenu'
import { ROUTES } from '@/lib/urls'

interface GlobalNavigationProps {
  name: string
  email: string
  myPageUrl: string
  avatarUrl?: string
  onLogout: () => void
}

const menuItems = [
  {
    label: 'ホーム',
    href: ROUTES.HOME,
    icon: IoHomeOutline
  },
  {
    label: '検索',
    href: ROUTES.EXPLORE,
    icon: IoSearchOutline
  },
  {
    label: '通知',
    href: ROUTES.NOTIFICATIONS,
    icon: IoNotificationsOutline
  },
  {
    label: '投稿',
    href: ROUTES.POST_NEW,
    icon: MdOutlineAddBox
  }
]

export const GlobalNavigation = ({ name, email, myPageUrl, avatarUrl, onLogout }: GlobalNavigationProps) => {
  return (
    <nav className="fixed right-0 bottom-0 left-0 z-50 border-t border-gray-200 bg-white backdrop-blur-sm md:top-0 md:right-auto md:left-0 md:h-screen md:w-64 md:border-t-0 md:border-r md:px-4 md:py-6">
      <div className="mx-auto flex max-w-80 flex-row items-center justify-around py-2 md:h-full md:flex-col md:justify-start md:gap-3 md:py-0">
        {menuItems.map(item => {
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-1 rounded-lg p-2 transition-colors hover:bg-gray-100 md:w-full md:flex-row md:gap-3 md:px-3 md:py-2"
            >
              <Icon className="size-6 text-gray-600 md:size-5" />
              <span className="hidden text-sm font-medium text-gray-700 md:inline">{item.label}</span>
            </Link>
          )
        })}

        <div className="md:mt-auto md:w-full">
          <UserMenu name={name} email={email} myPageUrl={myPageUrl} avatarUrl={avatarUrl} onLogout={onLogout} />
        </div>
      </div>
    </nav>
  )
}
