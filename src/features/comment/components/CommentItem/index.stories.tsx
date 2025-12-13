import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import { CommentItem } from '.'

const meta: Meta<typeof CommentItem> = {
  title: 'features/comment/CommentItem',
  component: CommentItem
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    user: {
      username: 'sakura',
      name: 'Sakura',
      avatarUrl: '/icon_avatar1.webp'
    },
    content: 'すごく素敵な写真ですね！'
  }
}

export const NoAvatar: Story = {
  args: {
    user: {
      username: 'yuta',
      name: 'Yuta'
    },
    content: 'いいね！'
  }
}

export const LongComment: Story = {
  args: {
    user: {
      username: 'hina',
      name: 'Hina',
      avatarUrl: '/icon_avatar2.webp'
    },
    content:
      'この写真本当に素晴らしいですね！構図も色合いも完璧で、見ていて心が癒されます。どこで撮影されたんですか？機会があればぜひ行ってみたいです。'
  }
}

export const CurrentUserComment: Story = {
  args: {
    user: {
      username: 'yuta',
      name: 'Yuta',
      avatarUrl: '/icon_avatar1.webp'
    },
    content: '自分のコメントには削除ボタンが表示されます',
    isCurrentUser: true,
    onDelete: fn()
  }
}
