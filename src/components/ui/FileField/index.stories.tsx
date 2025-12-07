import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import { FileField } from '.'

const meta: Meta<typeof FileField> = {
  title: 'components/ui/FileField',
  component: FileField
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onChange: fn()
  }
}
