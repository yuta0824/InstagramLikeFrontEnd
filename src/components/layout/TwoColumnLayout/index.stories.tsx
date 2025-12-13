import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { TwoColumnLayout } from '.'
import { SkeletonCardList } from '@/components/ui/Skeleton/SkeletonCardList'
import { SkeletonUserList } from '@/components/ui/Skeleton/SkeletonUserList'
import { GlobalNavigation } from '@/components/layout/GlobalNavigation'
import { fn } from 'storybook/test'

const meta: Meta<typeof TwoColumnLayout> = {
  title: 'components/layout/TwoColumnLayout',
  component: TwoColumnLayout,
  parameters: {
    layout: 'fullscreen'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    main: <SkeletonCardList />,
    aside: <SkeletonUserList />
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
