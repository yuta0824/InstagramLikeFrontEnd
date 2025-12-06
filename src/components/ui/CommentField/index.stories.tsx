import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import { CommentField } from '.'

const meta: Meta<typeof CommentField> = {
  title: 'components/ui/CommentField',
  component: CommentField
}

export default meta
type Story = StoryObj<typeof meta>

const defaultArgs = {
  errorMessage: 'コメントはログインが必要です',
  onMention: fn(),
  onSubmit: fn(),
  onChange: fn()
}

export const Default: Story = {
  args: defaultArgs
}

export const Error: Story = {
  args: {
    ...defaultArgs,
    isDisabled: true,
    isError: true
  }
}
