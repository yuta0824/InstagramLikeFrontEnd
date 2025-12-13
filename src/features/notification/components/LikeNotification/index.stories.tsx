import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { LikeNotification } from '.'

const meta: Meta<typeof LikeNotification> = {
  title: 'features/notification/LikeNotification',
  component: LikeNotification
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    users: [
      {
        name: 'Maki',
        username: 'maki',
        avatarUrl: '/icon_avatar3.webp'
      }
    ],
    timeAgo: '5時間前',
    postThumbnailUrl: '/img_post3.webp',
    postUrl: '/posts/3'
  }
}

export const NoAvatar: Story = {
  args: {
    users: [
      {
        name: 'Satoshi',
        username: 'satoshi'
      }
    ],
    timeAgo: '3分前',
    postThumbnailUrl: '/img_post4.webp',
    postUrl: '/posts/4'
  }
}

export const MultipleUsers: Story = {
  args: {
    users: [
      { name: 'Sakura', username: 'sakura', avatarUrl: '/icon_avatar1.webp' },
      { name: 'Yuta', username: 'yuta', avatarUrl: '/icon_avatar2.webp' },
      { name: 'Ken', username: 'ken' }
    ],
    totalCount: 8,
    timeAgo: '1時間前',
    postThumbnailUrl: '/img_post5.webp',
    postUrl: '/posts/5'
  }
}
