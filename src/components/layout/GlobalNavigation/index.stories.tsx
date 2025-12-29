import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { GlobalNavigation } from '.'
import { fn } from 'storybook/test'

const meta: Meta<typeof GlobalNavigation> = {
  title: 'components/layout/GlobalNavigation',
  component: GlobalNavigation,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'yuta',
    myPageUrl: '/account/yuta',
    avatarUrl: '/icon_avatar2.webp',
    onLogout: fn()
  }
}

export const NoAvatar: Story = {
  args: {
    name: 'sakura',
    myPageUrl: '/account/sakura',
    onLogout: fn()
  }
}

export const LongUserInfo: Story = {
  args: {
    name: 'very_long_username_that_should_truncate',
    myPageUrl: '/account/very_long_username',
    avatarUrl: '/icon_avatar1.webp',
    onLogout: fn()
  }
}
