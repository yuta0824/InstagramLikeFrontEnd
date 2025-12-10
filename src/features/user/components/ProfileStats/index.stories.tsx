import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ProfileStats } from '.'

const meta: Meta<typeof ProfileStats> = {
  title: 'features/user/ProfileStats',
  component: ProfileStats
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    posts: {
      label: '投稿',
      count: 14
    },
    followers: {
      label: 'フォロワー',
      count: 4,
      href: '/account/username/followers'
    },
    followings: {
      label: 'フォロー中',
      count: 3,
      href: '/account/username/followings'
    }
  }
}
