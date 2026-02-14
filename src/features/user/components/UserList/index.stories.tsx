import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { UserList } from '.'

const meta: Meta<typeof UserList> = {
  title: 'features/user/UserList',
  component: UserList
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    users: [
      {
        id: 1,
        name: 'hina',
        avatarUrl: '/icon_avatar1.webp',
        accountUrl: '/account/hina',
        lastPostStatusMessage: '最後の投稿は12時間前です'
      },
      {
        id: 2,
        name: 'haruto',
        avatarUrl: '/icon_avatar2.webp',
        accountUrl: '/account/haruto',
        lastPostStatusMessage: '最後の投稿は12時間前です'
      },
      {
        id: 3,
        name: 'mei',
        avatarUrl: '/icon_avatar3.webp',
        accountUrl: '/account/mei',
        lastPostStatusMessage: '最後の投稿は12時間前です'
      },
      {
        id: 4,
        name: 'ren',
        avatarUrl: '/icon_avatar4.webp',
        accountUrl: '/account/ren',
        lastPostStatusMessage: '最後の投稿は12時間前です'
      },
      {
        id: 5,
        name: 'yui',
        avatarUrl: '/icon_avatar1.webp',
        accountUrl: '/account/yui',
        lastPostStatusMessage: '最後の投稿は12時間前です'
      }
    ]
  }
}

export const SingleUser: Story = {
  args: {
    users: [
      {
        id: 1,
        name: 'sakura',
        avatarUrl: '/icon_avatar1.webp',
        accountUrl: '/account/sakura',
        lastPostStatusMessage: '最後の投稿は2時間前です'
      }
    ]
  }
}
