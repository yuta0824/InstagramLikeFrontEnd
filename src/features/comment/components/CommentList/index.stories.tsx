import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { CommentList } from '.'

const meta: Meta<typeof CommentList> = {
  title: 'features/comment/CommentList',
  component: CommentList
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    comments: [
      {
        userName: 'sakura',
        userAvatar: '/icon_avatar1.webp',
        content: 'すごく素敵な写真ですね！'
      },
      {
        userName: 'yuta',
        content: 'いいね！'
      },
      {
        userName: 'hina',
        userAvatar: '/icon_avatar2.webp',
        content: 'この写真本当に素晴らしいですね！構図も色合いも完璧です。'
      },
      {
        userName: 'ken',
        content: 'フォローさせていただきました！'
      },
      {
        userName: 'maki',
        userAvatar: '/icon_avatar1.webp',
        content: '綺麗ですね〜'
      }
    ]
  }
}

export const SingleComment: Story = {
  args: {
    comments: [
      {
        userName: 'sakura',
        userAvatar: '/icon_avatar1.webp',
        content: 'すごく素敵な写真ですね！'
      }
    ]
  }
}
