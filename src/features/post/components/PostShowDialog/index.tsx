'use client'

import { Dialog, DialogContent, DialogClose, DialogTitle } from '@/components/ui/dialog'
import { IoCloseCircle } from 'react-icons/io5'
import { PostDetailView, PostDetailViewProps } from '../PostDetailView'

interface PostShowDialogProps extends PostDetailViewProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const PostShowDialog = ({ open, onOpenChange, ...postDetailProps }: PostShowDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="grid max-h-[calc(100vh-2rem)] gap-0 overflow-auto rounded-none p-0 sm:max-w-4xl md:overflow-visible"
      >
        <DialogTitle className="sr-only">{postDetailProps.post.id}の詳細</DialogTitle>
        <DialogClose className="absolute top-0 right-0 z-50 text-white transition-opacity hover:opacity-70 md:-top-12">
          <IoCloseCircle className="size-8" />
          <span className="sr-only">Close</span>
        </DialogClose>

        <PostDetailView {...postDetailProps} />
      </DialogContent>
    </Dialog>
  )
}
