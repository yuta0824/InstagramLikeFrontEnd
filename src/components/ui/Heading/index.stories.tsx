import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Heading } from '.'

const meta = {
  title: 'components/ui/Heading',
  component: Heading
} satisfies Meta<typeof Heading>
export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    text: 'Heading'
  }
}
