import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import { PostFormDialog } from '.'

const meta: Meta<typeof PostFormDialog> = {
  title: 'features/post/PostFormDialog',
  component: PostFormDialog,
  parameters: {
    layout: 'centered'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    isOpen: true,
    onOpenChange: fn(),
    onSubmit: fn(),
    onCancel: fn(),
    onFilesChange: fn(),
    onCaptionChange: fn(),
    caption: '',
    isSubmitting: false,
    isSubmitDisabled: false,
    isImagesError: true,
    imagesErrorMessage: '画像を1枚以上選択してください',
    isCaptionError: true,
    captionErrorMessage: 'キャプションは100文字以内にしてください'
  }
}
