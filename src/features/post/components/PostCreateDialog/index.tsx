'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { FileField } from '@/components/ui/FileField'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

interface PostCreateDialogProps {
  trigger: React.ReactNode
  onSubmit?: (data: { images: File[]; caption: string }) => void
  onCancel?: () => void
}

export const PostCreateDialog = ({ trigger, onSubmit, onCancel }: PostCreateDialogProps) => {
  const [files, setFiles] = useState<File[]>([])
  const [caption, setCaption] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = () => {
    if (files.length === 0) {
      return
    }
    onSubmit?.({ images: files, caption })
    setFiles([])
    setCaption('')
    setIsOpen(false)
  }

  const handleCancel = () => {
    onCancel?.()
    setFiles([])
    setCaption('')
    setIsOpen(false)
  }

  const isSubmitDisabled = files.length === 0

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
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
