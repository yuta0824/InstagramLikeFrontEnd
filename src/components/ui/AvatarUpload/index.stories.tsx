import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { AvatarUpload } from '.'
import { fn } from 'storybook/test'

const meta: Meta<typeof AvatarUpload> = {
  title: 'components/ui/AvatarUpload',
  component: AvatarUpload
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    avatarUrl: '/icon_avatar2.webp',
    onFileChange: fn()
  }
}

export const NoAvatar: Story = {
  args: {
    onFileChange: fn()
  }
}
