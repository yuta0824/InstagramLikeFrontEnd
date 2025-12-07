import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { PostCard } from '.'
import { fn } from 'storybook/test'

const meta: Meta<typeof PostCard> = {
  title: 'features/post/PostCard',
  component: PostCard
}

export default meta
type Story = StoryObj<typeof meta>

export const SingleImages: Story = {
  args: {
    id: '1',
    user: {
      name: 'hina',
      avatarUrl: '/icon_avatar1.webp',
      accountUrl: '/account/hina'
    },
    currentUser: {
      isLiked: false,
      isOwner: false
    },
    images: ['/img_post1.webp'],
    caption: '美しい景色を楽しみました',
    timeAgo: '7 hours ago',
    likesCount: 42,
    commentsCount: 8,
    onLike: fn(),
    onComment: fn(),
    shareUrl: 'https://example.com/post/1'
  }
}

export const TwoImages: Story = {
  args: {
    id: '2',
    user: {
      name: 'yuki',
      avatarUrl: '/icon_avatar2.webp',
      accountUrl: '/account/yuki'
    },
    currentUser: {
      isLiked: true,
      isOwner: false
    },
    images: ['/img_post2.webp', '/img_post3.webp'],
    caption: '今の気分を写真で表そう',
    timeAgo: '9 hours ago',
    likesCount: 128,
    commentsCount: 24,
    onLike: fn(),
    onComment: fn(),
    shareUrl: 'https://example.com/post/2'
  }
}

export const ThreeImages: Story = {
  args: {
    id: '3',
    user: {
      name: 'sakura',
      avatarUrl: '/icon_avatar3.webp',
      accountUrl: '/account/sakura'
    },
    currentUser: {
      isLiked: false,
      isOwner: false
    },
    images: ['/img_post4.webp', '/img_post5.webp', '/img_post6.webp'],
    caption: '今や夢を叶いました',
    timeAgo: '2025/12/05',
    likesCount: 256,
    commentsCount: 45,
    onLike: fn(),
    onComment: fn(),
    shareUrl: 'https://example.com/post/3'
  }
}

export const MyPost: Story = {
  args: {
    id: '4',
    user: {
      name: 'takeshi',
      avatarUrl: '/icon_avatar4.webp',
      accountUrl: '/account/takeshi'
    },
    currentUser: {
      isLiked: false,
      isOwner: true
    },
    images: ['/img_post2.webp'],
    caption: 'いい雰囲気を楽しみました',
    timeAgo: '7 hours ago',
    likesCount: 89,
    commentsCount: 12,
    onLike: fn(),
    onComment: fn(),
    onEdit: fn(),
    onDelete: fn(),
    shareUrl: 'https://example.com/post/4'
  }
}

export const NoAvatar: Story = {
  args: {
    id: '5',
    user: {
      name: 'anonymous',
      accountUrl: '/account/anonymous'
    },
    currentUser: {
      isLiked: false,
      isOwner: false
    },
    images: ['/img_post8.webp', '/img_post9.webp'],
    caption: 'アバターなしでも投稿できます',
    timeAgo: '2 hours ago',
    likesCount: 15,
    commentsCount: 3,
    onLike: fn(),
    onComment: fn(),
    shareUrl: 'https://example.com/post/5'
  }
}
