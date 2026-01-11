import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { LoadingError } from '.'

const meta: Meta<typeof LoadingError> = {
  title: 'components/layout/LoadingError',
  component: LoadingError
}

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  args: {}
}
