import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { SkeletonCard } from '.'

const meta: Meta<typeof SkeletonCard> = {
  title: 'components/ui/Skeleton/SkeletonCard',
  component: SkeletonCard
}

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
