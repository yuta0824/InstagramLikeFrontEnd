import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { SingleColumnLayout } from '.'
import { SkeletonCard } from '@/components/ui/Skeleton/SkeletonCard'
import { GlobalNavigation } from '@/components/layout/GlobalNavigation'
import { fn } from 'storybook/test'

const meta: Meta<typeof SingleColumnLayout> = {
  title: 'layout/SingleColumnLayout',
  component: SingleColumnLayout,
  parameters: {
    layout: 'fullscreen'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <div className="space-y-10">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    )
  },
  decorators: [
    Story => (
      <div className="flex">
        <GlobalNavigation
          name="yuta"
          email="yuta@example.com"
          myPageUrl="/account/yuta"
          avatarUrl="/icon_avatar2.webp"
          onLogout={fn()}
        />
        <div className="flex-1 py-10">
          <Story />
        </div>
      </div>
    )
  ]
}
