import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import { BackButton } from '.'

const meta: Meta<typeof BackButton> = {
  title: 'components/ui/BackButton',
  component: BackButton
}

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  args: {
    onClick: fn()
  }
}
