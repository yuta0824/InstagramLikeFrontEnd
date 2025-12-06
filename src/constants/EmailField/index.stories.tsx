import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { EmailField } from '.'

const meta: Meta<typeof EmailField> = {
  title: 'components/EmailField',
  component: EmailField
}

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  args: {
    errorMessage: '必須項目です'
  }
}

export const Error: Story = {
  args: {
    isError: true,
    errorMessage: '必須項目です'
  }
}
