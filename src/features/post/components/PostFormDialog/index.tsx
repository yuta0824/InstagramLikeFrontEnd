'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { FileField } from '@/components/ui/FileField'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { PostImageGrid } from '../PostImageGrid'

interface PostFormDialogProps {
  type?: 'create' | 'edit'
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  onSubmit: () => void
  onCancel?: () => void
  onFilesChange: (files: File[]) => void
  onCaptionChange: (value: string) => void
  caption: string
  imageUrls?: string[]
  isSubmitting?: boolean
  isSubmitDisabled?: boolean
  isImagesError?: boolean
  imagesErrorMessage?: string
  isCaptionError?: boolean
  captionErrorMessage?: string
}

export const PostFormDialog = ({
  type = 'create',
  isOpen,
  onOpenChange,
  onSubmit,
  onCancel,
  onFilesChange,
  onCaptionChange,
  caption,
  imageUrls = [],
  isSubmitting = false,
  isSubmitDisabled = false,
  isImagesError = false,
  imagesErrorMessage = '',
  isCaptionError = false,
  captionErrorMessage = ''
}: PostFormDialogProps) => {
  const handleCancel = () => {
    onCancel?.()
    onOpenChange(false)
  }

  const isEditMode = type === 'edit'
  const isButtonDisabled = isSubmitDisabled || isSubmitting
  const resolvedTitle = isEditMode ? '投稿を編集' : '新しい投稿'
  const resolvedSubmitLabel = isSubmitting
    ? isEditMode
      ? '更新中...'
      : '投稿中...'
    : isEditMode
      ? '更新する'
      : '投稿する'

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>{resolvedTitle}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {isEditMode ? (
            <Field>
              <FieldLabel>画像</FieldLabel>
              <PostImageGrid imageUrls={imageUrls} getAlt={index => `投稿画像 ${index + 1}`} />
            </Field>
          ) : (
            <Field>
              <FieldLabel>画像（最大3枚）</FieldLabel>
              <FileField onChange={onFilesChange} />
              {isImagesError && imagesErrorMessage && <FieldError className="text-xs">{imagesErrorMessage}</FieldError>}
            </Field>
          )}

          <Field className="relative z-2">
            <FieldLabel htmlFor="caption" className="text-base">
              キャプション
            </FieldLabel>
            <Textarea
              id="caption"
              placeholder="キャプションを入力..."
              value={caption}
              onChange={e => onCaptionChange(e.target.value)}
              disabled={isSubmitting}
              className="h-20! max-h-20! resize-none overflow-auto"
              aria-invalid={isCaptionError}
            />
            {isCaptionError && captionErrorMessage && (
              <FieldError className="text-xs">{captionErrorMessage}</FieldError>
            )}
          </Field>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleCancel} disabled={isSubmitting}>
            キャンセル
          </Button>
          <Button onClick={onSubmit} disabled={isButtonDisabled}>
            {resolvedSubmitLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
