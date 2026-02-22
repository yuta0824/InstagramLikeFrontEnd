import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { NotificationList } from '.'
import { CommentNotification } from '../CommentNotification'
import { LikeNotification } from '../LikeNotification'
import { FollowNotification } from '../FollowNotification'

const meta: Meta<typeof NotificationList> = {
  title: 'features/notification/NotificationList',
  component: NotificationList
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <NotificationList>
      <LikeNotification
        users={[
          { name: 'Sakura', avatarUrl: '/icon_avatar1.webp' },
          { name: 'Ken' },
          { name: 'Maki', avatarUrl: '/icon_avatar3.webp' }
        ]}
        totalCount={6}
        timeAgo="5時間前"
        postThumbnailUrl="/img_post1.webp"
        postUrl="/posts/1"
      />
      <hr />
      <CommentNotification
        user={{ name: 'Yuta' }}
        timeAgo="10分前"
        comment="すごく素敵です！"
        postThumbnailUrl="/img_post2.webp"
        postUrl="/posts/2"
      />
      <hr />
      <FollowNotification
        users={[{ name: 'Hina', avatarUrl: '/icon_avatar2.webp' }, { name: 'Satoshi' }]}
        totalCount={4}
        timeAgo="1日前"
      />
    </NotificationList>
  )
}
