import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { UserNameField } from '.'

const meta: Meta<typeof UserNameField> = {
  title: 'components/UserNameField',
  component: UserNameField
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
