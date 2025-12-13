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
        user: { username: 'sakura', name: 'Sakura', avatarUrl: '/icon_avatar1.webp' },
        content: 'すごく素敵な写真ですね！'
      },
      {
        user: { username: 'yuta', name: 'Yuta' },
        content: 'いいね！'
      },
      {
        user: { username: 'hina', name: 'Hina', avatarUrl: '/icon_avatar2.webp' },
        content: 'この写真本当に素晴らしいですね！構図も色合いも完璧です。'
      },
      {
        user: { username: 'ken', name: 'Ken' },
        content: 'フォローさせていただきました！'
      },
      {
        user: { username: 'maki', name: 'Maki', avatarUrl: '/icon_avatar1.webp' },
        content: '綺麗ですね〜'
      }
    ]
  }
}

export const SingleComment: Story = {
  args: {
    comments: [
      {
        user: { username: 'sakura', name: 'Sakura', avatarUrl: '/icon_avatar1.webp' },
        content: 'すごく素敵な写真ですね！'
      }
    ]
  }
}
