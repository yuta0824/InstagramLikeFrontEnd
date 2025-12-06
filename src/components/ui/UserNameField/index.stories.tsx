import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { UserNameField } from '.'

const meta: Meta<typeof UserNameField> = {
  title: 'components/ui/UserNameField',
  component: UserNameField
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
