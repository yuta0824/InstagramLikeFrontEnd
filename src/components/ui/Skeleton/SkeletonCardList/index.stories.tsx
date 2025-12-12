import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { SkeletonCardList } from '.'

const meta: Meta<typeof SkeletonCardList> = {
  title: 'components/ui/Skeleton/SkeletonCardList',
  component: SkeletonCardList
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
