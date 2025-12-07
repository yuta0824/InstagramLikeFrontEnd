import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { SkeletonUser } from '.'

const meta: Meta<typeof SkeletonUser> = {
  title: 'components/ui/Skeleton/SkeletonUser',
  component: SkeletonUser
}

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
