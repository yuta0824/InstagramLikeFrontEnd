import { useRef } from 'react'
import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { UserListDialog } from '.'

const meta: Meta<typeof UserListDialog> = {
  title: 'features/user/UserListDialog',
  component: UserListDialog,
  args: {
    open: true,
    onOpenChange: () => {},
    isFetchingNextPage: false
  },
  decorators: [
    Story => {
      const ref = useRef<HTMLDivElement>(null)
      return <Story args={{ sentinelRef: ref } as never} />
    }
  ]
}

export default meta
type Story = StoryObj<typeof meta>

const mockUsers = [
  { id: 1, name: 'hina', avatarUrl: '/icon_avatar1.webp', accountUrl: '/accounts/hina', isFollowing: true },
  { id: 2, name: 'haruto', avatarUrl: '/icon_avatar2.webp', accountUrl: '/accounts/haruto', isFollowing: false },
  { id: 3, name: 'mei', avatarUrl: '/icon_avatar3.webp', accountUrl: '/accounts/mei', isFollowing: true },
  { id: 4, name: 'ren', avatarUrl: '/icon_avatar4.webp', accountUrl: '/accounts/ren', isFollowing: false },
  { id: 5, name: 'yui', avatarUrl: '/icon_avatar1.webp', accountUrl: '/accounts/yui', isFollowing: true }
]

export const Followers: Story = {
  args: {
    title: 'フォロワー',
    users: mockUsers,
    isLoading: false,
    isError: false
  }
}

export const Loading: Story = {
  args: {
    title: 'フォロワー',
    users: [],
    isLoading: true,
    isError: false
  }
}

export const Empty: Story = {
  args: {
    title: 'フォロワー',
    users: [],
    isLoading: false,
    isError: false
  }
}

export const Error: Story = {
  args: {
    title: 'フォロワー',
    users: [],
    isLoading: false,
    isError: true
  }
}
