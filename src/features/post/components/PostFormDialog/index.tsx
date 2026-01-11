'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { FileField } from '@/components/ui/FileField'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

interface PostFormDialogProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  onSubmit?: (data: { images: File[]; caption: string }) => void
  onCancel?: () => void
}

export const PostFormDialog = ({ isOpen, onSubmit, onCancel, onOpenChange }: PostFormDialogProps) => {
  const [files, setFiles] = useState<File[]>([])
  const [caption, setCaption] = useState('')

  const handleSubmit = () => {
    if (files.length === 0) {
      return
    }
    onSubmit?.({ images: files, caption })
    setFiles([])
    setCaption('')
  }

  const handleCancel = () => {
    onCancel?.()
    setFiles([])
    setCaption('')
  }

  const isSubmitDisabled = files.length === 0

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>新しい投稿</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label>画像（最大3枚）</Label>
            <FileField onChange={setFiles} />
          </div>

          <div className="relative z-2 space-y-2">
            <Label htmlFor="caption">キャプション</Label>
            <Textarea
              id="caption"
              placeholder="キャプションを入力..."
              value={caption}
              onChange={e => setCaption(e.target.value)}
              className="h-20! max-h-20! resize-none overflow-auto"
            />
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleCancel}>
            キャンセル
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitDisabled}>
            投稿する
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
