import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { SingleColumnLayout } from '.'
import { SkeletonCardList } from '@/components/ui/Skeleton/SkeletonCardList'
import { GlobalNavigation } from '@/components/layout/GlobalNavigation'
import { fn } from 'storybook/test'

const meta: Meta<typeof SingleColumnLayout> = {
  title: 'components/layout/SingleColumnLayout',
  component: SingleColumnLayout,
  parameters: {
    layout: 'fullscreen'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: <SkeletonCardList />
  },
  decorators: [
    Story => (
      <div className="flex">
        <GlobalNavigation name="yuta" myPageUrl="/account/yuta" avatarUrl="/icon_avatar2.webp" onLogout={fn()} />
        <div className="flex-1 py-4">
          <Story />
        </div>
      </div>
    )
  ]
}
