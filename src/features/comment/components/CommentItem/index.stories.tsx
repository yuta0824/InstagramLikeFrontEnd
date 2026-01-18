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
    userName: 'sakura',
    userAvatar: '/icon_avatar1.webp',
    content: 'すごく素敵な写真ですね！'
  }
}

export const NoAvatar: Story = {
  args: {
    userName: 'yuta',
    content: 'いいね！'
  }
}

export const LongComment: Story = {
  args: {
    userName: 'hina',
    userAvatar: '/icon_avatar2.webp',
    content:
      'この写真本当に素晴らしいですね！構図も色合いも完璧で、見ていて心が癒されます。どこで撮影されたんですか？機会があればぜひ行ってみたいです。'
  }
}

export const CurrentUserComment: Story = {
  args: {
    userName: 'yuta',
    userAvatar: '/icon_avatar1.webp',
    content: '自分のコメントには削除ボタンが表示されます',
    isOwner: true,
    onDelete: fn()
  }
}
