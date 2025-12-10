import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { UserListItem } from '.'

const meta: Meta<typeof UserListItem> = {
  title: 'features/user/UserListItem',
  component: UserListItem
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'sakura',
    avatarUrl: '/icon_avatar1.webp',
    accountUrl: '/account/sakura',
    lastPostStatusMessage: '最後の投稿は12時間前です'
  }
}

export const NoAvatar: Story = {
  args: {
    name: 'sakura',
    accountUrl: '/account/sakura',
    lastPostStatusMessage: '最後の投稿は12時間前です'
  }
}
