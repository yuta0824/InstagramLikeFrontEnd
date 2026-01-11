import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { SkeletonGlobalNavigation } from '.'

const meta: Meta<typeof SkeletonGlobalNavigation> = {
  title: 'components/layout/Skeleton/SkeletonGlobalNavigation',
  component: SkeletonGlobalNavigation
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
