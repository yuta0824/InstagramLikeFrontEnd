import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { PostsEmptyState } from '.'

const meta: Meta<typeof PostsEmptyState> = {
  title: 'features/post/PostsEmptyState',
  component: PostsEmptyState
}

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  args: {}
}
