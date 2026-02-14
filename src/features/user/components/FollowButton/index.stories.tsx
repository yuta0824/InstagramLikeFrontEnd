import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { FollowButton } from '.'

const meta: Meta<typeof FollowButton> = {
  title: 'features/user/FollowButton',
  component: FollowButton,
  decorators: [
    Story => (
      <div style={{ maxWidth: 120 }}>
        <Story />
      </div>
    )
  ]
}

export default meta
type Story = StoryObj<typeof meta>

export const NotFollowing: Story = {
  args: {
    isFollowing: false,
    isPending: false,
    onClick: () => console.log('follow clicked')
  }
}

export const Following: Story = {
  args: {
    isFollowing: true,
    isPending: false,
    onClick: () => console.log('unfollow clicked')
  }
}

export const PendingFollow: Story = {
  args: {
    isFollowing: false,
    isPending: true,
    onClick: () => {}
  }
}

export const PendingUnfollow: Story = {
  args: {
    isFollowing: true,
    isPending: true,
    onClick: () => {}
  }
}
