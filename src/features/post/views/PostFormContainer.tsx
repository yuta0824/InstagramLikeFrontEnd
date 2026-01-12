'use client'

import { useQueryClient } from '@tanstack/react-query'
import { useForm, useWatch } from 'react-hook-form'
import { toast } from 'sonner'
import { useAtomValue, useSetAtom } from 'jotai'
import { PostFormDialog } from '../components/PostFormDialog'
import { postFormOpenAtom } from '../states/postFormAtom'
import { useCreatePost } from '../modules/useCreatePost'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'

type PostFormValues = {
  caption?: string
  images: File[]
}

export const PostFormContainer = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const isDialogOpen = useAtomValue(postFormOpenAtom)
  const setPostFormOpen = useSetAtom(postFormOpenAtom)
  const createPostMutation = useCreatePost()
  const schema = z.object({
    caption: z.string().max(100, 'キャプションは100文字以内で入力してください').optional(),
    images: z.array(z.instanceof(File)).min(1, '画像を1枚以上選択してください').max(3, '画像は最大3枚までです')
  })

  const {
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors }
  } = useForm<PostFormValues>({
    defaultValues: {
      caption: '',
      images: []
    },
    resolver: zodResolver(schema)
  })

  const images = useWatch({ control, name: 'images' }) ?? []
  const caption = useWatch({ control, name: 'caption' }) ?? ''
  const hasImagesError = !!errors.images
  const hasCaptionError = !!errors.caption
  const imagesErrorMessage = errors.images?.message
  const captionErrorMessage = errors.caption?.message

  const handleDialogClose = () => {
    setPostFormOpen(false)
    reset()
  }

  const handleFilesChange = (files: File[]) => {
    setValue('images', files)
  }

  const handleCaptionChange = (value: string) => {
    setValue('caption', value)
  }

  const handleSubmitPost = handleSubmit(values => {
    createPostMutation.mutate(
      { images: values.images, caption: values.caption },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['getPosts'] })
          toast.success('投稿しました。')
          handleDialogClose()
          router.push('/home')
        },
        onError: error => {
          console.error(error)
          toast.error('投稿に失敗しました。')
        }
      }
    )
  })

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      handleDialogClose()
    }
  }

  return (
    <PostFormDialog
      isOpen={isDialogOpen}
      onOpenChange={handleOpenChange}
      onSubmit={handleSubmitPost}
      onCancel={handleDialogClose}
      onFilesChange={handleFilesChange}
      onCaptionChange={handleCaptionChange}
      caption={caption}
      isSubmitting={createPostMutation.isPending}
      isSubmitDisabled={images.length === 0}
      isImagesError={hasImagesError}
      imagesErrorMessage={imagesErrorMessage}
      isCaptionError={hasCaptionError}
      captionErrorMessage={captionErrorMessage}
    />
  )
}
