import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import { UserListItem } from '.'

const meta: Meta<typeof UserListItem> = {
  title: 'features/user/UserListItem',
  component: UserListItem
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    id: 1,
    name: 'sakura',
    avatarUrl: '/icon_avatar1.webp',
    accountUrl: '/account/sakura',
    lastPostStatusMessage: '最後の投稿は12時間前です'
  }
}

export const NoAvatar: Story = {
  args: {
    id: 2,
    name: 'sakura',
    accountUrl: '/account/sakura',
    lastPostStatusMessage: '最後の投稿は12時間前です'
  }
}

export const WithFollowButton: Story = {
  args: {
    id: 3,
    name: 'sakura',
    avatarUrl: '/icon_avatar1.webp',
    isFollowing: false,
    onToggleFollow: fn()
  }
}

export const Following: Story = {
  args: {
    id: 4,
    name: 'sakura',
    avatarUrl: '/icon_avatar1.webp',
    isFollowing: true,
    onToggleFollow: fn()
  }
}
