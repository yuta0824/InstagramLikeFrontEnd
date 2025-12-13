import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import { PostShowDialog } from '.'

const meta: Meta<typeof PostShowDialog> = {
  title: 'features/post/PostShowDialog',
  component: PostShowDialog,
  parameters: {
    layout: 'centered'
  }
}

export default meta
type Story = StoryObj<typeof meta>

const samplePost = {
  id: '1',
  imageUrls: ['/img_post8.webp', '/img_post1.webp', '/img_post2.webp'],
  user: {
    name: 'Kirei Nakesiki',
    username: 'kirei_nakesiki',
    avatarUrl: '/icon_avatar2.webp'
  },
  caption:
    'テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト',
  likes: 181,
  isLiked: false,
  commentsCount: 24,
  createdAt: '2022年4月22日'
}

const sampleComments = [
  {
    user: { username: 'sakura', name: 'Sakura', avatarUrl: '/icon_avatar1.webp' },
    content: 'すごく素敵な写真ですね！'
  },
  {
    user: { username: 'sakura', name: 'Sakura', avatarUrl: '/icon_avatar1.webp' },
    content: 'すごく素敵な写真ですね！'
  },
  {
    user: { username: 'sakura', name: 'Sakura', avatarUrl: '/icon_avatar1.webp' },
    content: 'すごく素敵な写真ですね！'
  },
  {
    user: { username: 'sakura', name: 'Sakura', avatarUrl: '/icon_avatar1.webp' },
    content: 'すごく素敵な写真ですね！'
  },
  {
    user: { username: 'sakura', name: 'Sakura', avatarUrl: '/icon_avatar1.webp' },
    content: 'すごく素敵な写真ですね！'
  },
  {
    user: { username: 'sakura', name: 'Sakura', avatarUrl: '/icon_avatar1.webp' },
    content: 'すごく素敵な写真ですね！'
  },
  {
    user: { username: 'yuta', name: 'Yuta' },
    content: 'いいね！',
    isCurrentUser: true,
    onDelete: fn()
  },
  {
    user: { username: 'hina', name: 'Hina', avatarUrl: '/icon_avatar2.webp' },
    content: 'この写真本当に素晴らしいですね！構図も色合いも完璧で、見ていて心が癒されます。'
  }
]

export const Default: Story = {
  args: {
    trigger: <button className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">投稿を表示</button>,
    post: samplePost,
    comments: sampleComments,
    shareUrl: 'https://example.com/posts/1',
    onLike: fn(),
    onEditPost: fn(),
    onDeletePost: fn(),
    commentValue: '',
    onCommentValueChange: fn(),
    onCommentSubmit: fn(),
    timeAgo: '4時間前'
  }
}

export const ManyComments: Story = {
  args: {
    trigger: <button className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">大量コメント</button>,
    post: samplePost,
    comments: Array.from({ length: 30 }, (_, i) => ({
      user: {
        username: `user${i + 1}`,
        name: `User ${i + 1}`,
        avatarUrl: i % 3 === 0 ? '/icon_avatar1.webp' : undefined
      },
      content: `コメント ${i + 1}: これは${i + 1}番目のコメントです。とても素敵な写真ですね！`,
      isCurrentUser: i === 4,
      onDelete: i === 4 ? fn() : undefined
    })),
    shareUrl: 'https://example.com/posts/1',
    onLike: fn(),
    onEditPost: fn(),
    onDeletePost: fn(),
    commentValue: '',
    onCommentValueChange: fn(),
    onCommentSubmit: fn(),
    timeAgo: '2日前'
  }
}
