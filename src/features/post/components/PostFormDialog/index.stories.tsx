import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import { PostFormDialog } from '.'

const meta: Meta<typeof PostFormDialog> = {
  title: 'features/post/PostFormDialog',
  component: PostFormDialog,
  parameters: {
    layout: 'centered'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onSubmit: fn(),
    onCancel: fn()
  }
}
