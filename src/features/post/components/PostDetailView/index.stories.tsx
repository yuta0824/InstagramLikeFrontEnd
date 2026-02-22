import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import { PostDetailView } from '.'

const meta: Meta<typeof PostDetailView> = {
  title: 'features/post/PostDetailView',
  component: PostDetailView,
  parameters: {
    layout: 'fullscreen'
  }
}

export default meta
type Story = StoryObj<typeof meta>

const samplePost = {
  id: '1',
  imageUrls: ['/img_post8.webp', '/img_post1.webp', '/img_post2.webp'],
  user: {
    name: 'Kirei Nakesiki',
    avatarUrl: '/icon_avatar2.webp'
  },
  caption:
    'テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト',
  likes: 181,
  isLiked: false,
  isOwn: true
}

const sampleComments = [
  {
    userName: 'sakura',
    userAvatar: '/icon_avatar1.webp',
    content: 'すごく素敵な写真ですね！'
  },
  {
    userName: 'sakura',
    userAvatar: '/icon_avatar1.webp',
    content: 'すごく素敵な写真ですね！'
  },
  {
    userName: 'yuta',
    content: 'いいね！',
    isOwner: true,
    onDelete: fn()
  },
  {
    userName: 'hina',
    userAvatar: '/icon_avatar2.webp',
    content: 'この写真本当に素晴らしいですね！構図も色合いも完璧で、見ていて心が癒されます。'
  }
]

export const Default: Story = {
  args: {
    post: samplePost,
    comments: sampleComments,
    shareUrl: 'https://example.com/posts/1',
    onLike: fn(),
    onEdit: fn(),
    onDelete: fn(),
    commentValue: '',
    onCommentValueChange: fn(),
    onCommentSubmit: fn(),
    commentError: '',
    timeAgo: '4時間前'
  }
}

export const LoadingComments: Story = {
  args: {
    post: samplePost,
    comments: [],
    isLoadingComments: true,
    shareUrl: 'https://example.com/posts/1',
    onLike: fn(),
    onEdit: fn(),
    onDelete: fn(),
    commentValue: '',
    onCommentValueChange: fn(),
    onCommentSubmit: fn(),
    commentError: '',
    timeAgo: '4時間前'
  }
}
