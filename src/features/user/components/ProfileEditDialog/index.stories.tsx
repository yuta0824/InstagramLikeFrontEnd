import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ProfileEditDialog } from '.'
import { fn } from 'storybook/test'

const meta: Meta<typeof ProfileEditDialog> = {
  title: 'features/user/ProfileEditDialog',
  component: ProfileEditDialog
}

export default meta
type Story = StoryObj<typeof meta>

const baseArgs = {
  isOpen: true,
  onOpenChange: fn(),
  userName: 'yuta',
  nameValue: 'yuta',
  onNameChange: fn(),
  onFileSelect: fn(),
  onRemoveAvatar: fn(),
  onSave: fn(),
  onCancel: fn(),
  isSubmitting: false,
  hasChanges: false,
  hasAvatar: true
}

export const WithAvatar: Story = {
  args: {
    ...baseArgs,
    avatarPreviewUrl: '/icon_avatar2.webp'
  }
}

export const WithoutAvatar: Story = {
  args: {
    ...baseArgs,
    avatarPreviewUrl: undefined,
    hasAvatar: false
  }
}

export const HasChanges: Story = {
  args: {
    ...baseArgs,
    avatarPreviewUrl: '/icon_avatar2.webp',
    nameValue: 'yuta_updated',
    hasChanges: true
  }
}

export const NameError: Story = {
  args: {
    ...baseArgs,
    avatarPreviewUrl: '/icon_avatar2.webp',
    nameValue: '',
    hasChanges: true,
    nameError: '名前を入力してください。'
  }
}

export const Submitting: Story = {
  args: {
    ...baseArgs,
    avatarPreviewUrl: '/icon_avatar2.webp',
    nameValue: 'yuta_updated',
    hasChanges: true,
    isSubmitting: true
  }
}
