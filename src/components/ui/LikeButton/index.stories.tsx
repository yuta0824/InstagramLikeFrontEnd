import { useState } from 'react'
import { LikeButton } from '.'
import { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta: Meta<typeof LikeButton> = {
  title: 'components/ui/LikeButton',
  component: LikeButton
}

export default meta
type Story = StoryObj<typeof LikeButton>

const ControlledTemplate = (args: React.ComponentProps<typeof LikeButton>) => {
  const [liked, setLiked] = useState(args.liked ?? false)
  const [count, setCount] = useState(args.count ?? 0)

  return (
    <LikeButton
      liked={liked}
      count={count}
      onToggle={nextLiked => {
        setLiked(nextLiked)
        setCount(prev => Math.max(0, prev + (nextLiked ? 1 : -1)))
      }}
    />
  )
}

export const Default: Story = {
  args: {
    count: 12,
    liked: false
  },
  render: ControlledTemplate
}
