import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { TwoColumnLayout } from '.'
import { SkeletonUser } from '@/components/ui/Skeleton/SkeletonUser'
import { SkeletonCard } from '@/components/ui/Skeleton/SkeletonCard'
import { GlobalNavigation } from '@/components/layout/GlobalNavigation'
import { fn } from 'storybook/test'

const meta: Meta<typeof TwoColumnLayout> = {
  title: 'layout/TwoColumnLayout',
  component: TwoColumnLayout,
  parameters: {
    layout: 'fullscreen'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    main: (
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
    ),
    aside: (
      <div className="space-y-8">
        <SkeletonUser />
        <SkeletonUser />
        <SkeletonUser />
        <SkeletonUser />
        <SkeletonUser />
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
        <div className="flex-1 py-4">
          <Story />
        </div>
      </div>
    )
  ]
}
