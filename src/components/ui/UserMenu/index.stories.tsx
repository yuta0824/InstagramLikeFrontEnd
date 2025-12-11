import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { UserMenu } from '.'
import { fn } from 'storybook/test'

const meta: Meta<typeof UserMenu> = {
  title: 'components/ui/UserMenu',
  component: UserMenu
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'yuta',
    email: 'yuta@example.com',
    myPageUrl: '/account/yuta',
    avatarUrl: '/icon_avatar2.webp',
    onLogout: fn()
  }
}

export const NoAvatar: Story = {
  args: {
    name: 'sakura',
    email: 'sakura@example.com',
    myPageUrl: '/account/sakura',
    onLogout: fn()
  }
}
