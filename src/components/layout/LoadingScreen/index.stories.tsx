import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { LoadingScreen } from '.'

const meta: Meta<typeof LoadingScreen> = {
  title: 'components/LoadingScreen',
  component: LoadingScreen
}

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  args: {}
}
