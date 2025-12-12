import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { SkeletonUserList } from '.'

const meta: Meta<typeof SkeletonUserList> = {
  title: 'components/ui/Skeleton/SkeletonUserList',
  component: SkeletonUserList
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
