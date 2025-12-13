import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import { PostCreateDialog } from '.'

const meta: Meta<typeof PostCreateDialog> = {
  title: 'features/post/PostCreateDialog',
  component: PostCreateDialog,
  parameters: {
    layout: 'centered'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    trigger: <button className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">新しい投稿</button>,
    onSubmit: fn(),
    onCancel: fn()
  }
}
