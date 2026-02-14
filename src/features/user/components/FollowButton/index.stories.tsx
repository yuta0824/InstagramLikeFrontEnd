import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { FollowButton } from '.'
import { fn } from 'storybook/test'

const meta: Meta<typeof FollowButton> = {
  title: 'features/user/FollowButton',
  component: FollowButton
}

export default meta
type Story = StoryObj<typeof meta>

export const NotFollowing: Story = {
  args: {
    isFollowing: false,
    isPending: false,
    onClick: fn()
  }
}

export const Following: Story = {
  args: {
    isFollowing: true,
    isPending: false,
    onClick: fn()
  }
}

export const PendingFollow: Story = {
  args: {
    isFollowing: false,
    isPending: true,
    onClick: fn()
  }
}

export const PendingUnfollow: Story = {
  args: {
    isFollowing: true,
    isPending: true,
    onClick: fn()
  }
}
