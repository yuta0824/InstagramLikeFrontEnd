import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { PostImageGrid } from '.'

const meta: Meta<typeof PostImageGrid> = {
  title: 'features/post/PostImageGrid',
  component: PostImageGrid
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    imageUrls: ['/img_post1.webp', '/img_post2.webp', '/img_post3.webp'],
    getAlt: index => `post image ${index + 1}`
  }
}
