import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import { Button } from '.'

const meta: Meta<typeof Button> = {
  title: 'components/ui/Button',
  component: Button
}

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  args: {
    text: 'ボタン',
    onClick: fn()
  }
}
