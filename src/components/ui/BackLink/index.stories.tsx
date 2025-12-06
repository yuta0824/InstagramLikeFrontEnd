import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { BackLink } from '.'

const meta: Meta<typeof BackLink> = {
  title: 'components/ui/BackLink',
  component: BackLink
}

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  args: {
    href: '/'
  }
}
