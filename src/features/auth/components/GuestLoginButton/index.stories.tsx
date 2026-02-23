import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { GuestLoginButton } from '.'

const meta: Meta<typeof GuestLoginButton> = {
  component: GuestLoginButton
}

export default meta
type Story = StoryObj<typeof GuestLoginButton>

export const Default: Story = {
  args: {
    onClick: () => {},
    isLoading: false
  }
}

export const Loading: Story = {
  args: {
    onClick: () => {},
    isLoading: true
  }
}
