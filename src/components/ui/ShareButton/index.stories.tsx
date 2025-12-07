import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ShareButton } from '.'

const meta: Meta<typeof ShareButton> = {
  title: 'components/ui/ShareButton',
  component: ShareButton
}

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  args: {
    url: 'https://example.com/post/123'
  }
}
