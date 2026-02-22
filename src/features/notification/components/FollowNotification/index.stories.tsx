import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { FollowNotification } from '.'

const meta: Meta<typeof FollowNotification> = {
  title: 'features/notification/FollowNotification',
  component: FollowNotification
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    users: [
      {
        name: 'Hina',
        avatarUrl: '/icon_avatar2.webp'
      }
    ],
    timeAgo: '1時間前'
  }
}

export const NoAvatar: Story = {
  args: {
    users: [
      {
        name: 'Ken'
      }
    ],
    timeAgo: '昨日'
  }
}

export const MultipleUsers: Story = {
  args: {
    users: [
      { name: 'Sakura', avatarUrl: '/icon_avatar1.webp' },
      { name: 'Yuta' },
      { name: 'Maki', avatarUrl: '/icon_avatar3.webp' }
    ],
    totalCount: 5,
    timeAgo: '2時間前'
  }
}
