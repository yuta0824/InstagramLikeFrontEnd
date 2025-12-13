import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { PageHeader } from '.'
import { fn } from 'storybook/test'

const meta: Meta<typeof PageHeader> = {
  title: 'components/layout/PageHeader',
  component: PageHeader,
  parameters: {
    layout: 'fullscreen'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Followings',
    onBack: fn()
  }
}

export const WithRightContent: Story = {
  args: {
    title: 'hina',
    onBack: fn(),
    rightContent: <button className="text-sm text-blue-500 hover:text-blue-600">Follow</button>
  }
}

export const LongTitle: Story = {
  args: {
    title: 'Very Long Title That Should Be Truncated When It Exceeds The Available Space',
    onBack: fn()
  }
}

export const FixedHeader: Story = {
  args: {
    title: 'Fixed Header',
    onBack: fn(),
    isFixed: true,
    rightContent: <button className="text-sm text-blue-500 hover:text-blue-600">Edit</button>
  },
  decorators: [
    Story => (
      <div>
        <Story />
        <div className="pt-12">
          <div className="h-[200vh] bg-linear-to-b from-gray-50 to-gray-200 p-8">
            <h2 className="mb-4 text-xl font-bold">Scroll to see the fixed header</h2>
            <p className="mb-4">このページをスクロールすると、ヘッダーが固定されていることが確認できます。</p>
            {Array.from({ length: 50 }, (_, i) => (
              <p key={i} className="mb-2">
                Content line {i + 1}
              </p>
            ))}
          </div>
        </div>
      </div>
    )
  ]
}
