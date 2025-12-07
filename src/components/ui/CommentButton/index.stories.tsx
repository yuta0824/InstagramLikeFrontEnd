import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { CommentButton } from '.'
import { fn } from 'storybook/test'

const meta: Meta<typeof CommentButton> = {
  title: 'components/ui/CommentButton',
  component: CommentButton
}

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  args: {
    count: 12,
    onClick: fn()
  }
}
