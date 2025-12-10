import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ProfileHeader } from '.'
import { fn } from 'storybook/test'

const meta: Meta<typeof ProfileHeader> = {
  title: 'features/user/ProfileHeader',
  component: ProfileHeader
}

export default meta
type Story = StoryObj<typeof meta>

export const OtherUserProfile: Story = {
  args: {
    avatarUrl: '/icon_avatar1.webp',
    userName: 'hina',
    isCurrentUser: false,
    stats: {
      posts: {
        label: '投稿',
        count: 14
      },
      followers: {
        label: 'フォロワー',
        count: 4,
        href: '/account/hina/followers'
      },
      followings: {
        label: 'フォロー中',
        count: 3,
        href: '/account/hina/followings'
      }
    }
  }
}

export const CurrentUserProfile: Story = {
  args: {
    avatarUrl: '/icon_avatar2.webp',
    userName: 'yuta',
    isCurrentUser: true,
    stats: {
      posts: {
        label: '投稿',
        count: 42
      },
      followers: {
        label: 'フォロワー',
        count: 128,
        href: '/account/yuta/followers'
      },
      followings: {
        label: 'フォロー中',
        count: 89,
        href: '/account/yuta/followings'
      }
    },
    onFileChange: fn()
  }
}
