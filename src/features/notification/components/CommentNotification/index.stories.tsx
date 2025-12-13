import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { CommentNotification } from '.'

const meta: Meta<typeof CommentNotification> = {
  title: 'features/notification/CommentNotification',
  component: CommentNotification
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    user: {
      name: 'Sakura',
      username: 'sakura',
      avatarUrl: '/icon_avatar1.webp'
    },
    comment: '素敵な写真ですね！',
    timeAgo: '5時間前',
    postThumbnailUrl: '/img_post1.webp',
    postUrl: '/posts/1'
  }
}

export const NoAvatar: Story = {
  args: {
    user: {
      name: 'Yuta',
      username: 'yuta'
    },
    comment: 'いいね！',
    timeAgo: '10分前',
    postThumbnailUrl: '/img_post2.webp',
    postUrl: '/posts/2'
  }
}
