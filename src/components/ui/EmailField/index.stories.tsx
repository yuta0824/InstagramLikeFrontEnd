import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { EmailField } from '.'

const meta: Meta<typeof EmailField> = {
  title: 'components/ui/EmailField',
  component: EmailField
}

export default meta
type Story = StoryObj<typeof meta>

const defaultArgs = {
  errorMessage: '必須項目です'
}

export const Default: Story = {
  args: defaultArgs
}

export const Error: Story = {
  args: {
    ...defaultArgs,
    isError: true
  }
}
