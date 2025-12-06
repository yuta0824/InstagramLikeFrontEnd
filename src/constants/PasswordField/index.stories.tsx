import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { PasswordField } from '.'

const meta: Meta<typeof PasswordField> = {
  title: 'components/PasswordField',
  component: PasswordField
}

export default meta
type Story = StoryObj<typeof meta>

const defaultArgs = {
  description: '最低6文字以上で設定してください',
  errorMessage: 'パスワードが違います'
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
