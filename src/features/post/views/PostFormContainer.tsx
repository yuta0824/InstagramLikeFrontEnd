'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { useAtomValue, useSetAtom } from 'jotai'
import { PostFormDialog } from '../components/PostFormDialog'
import { useCreatePost } from '../api/useCreatePost'
import { useEditPost } from '../api/useEditPost'
import { initialPostFormState, postFormStateAtom } from '../states/postFormAtom'

type PostFormValues = {
  caption?: string
  images: File[]
}

export const PostFormContainer = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const postFormState = useAtomValue(postFormStateAtom)
  const setPostFormState = useSetAtom(postFormStateAtom)
  const createPostMutation = useCreatePost()
  const editPostMutation = useEditPost()
  const { defaults, isOpen, mode } = postFormState
  const isEditMode = mode === 'edit'
  const defaultCaption = defaults.caption ?? ''
  const defaultPostId = defaults.id

  const imagesSchema = z.array(z.instanceof(File)).max(3, '画像は最大3枚までです')
  const schema = z.object({
    caption: z.string().max(100, 'キャプションは100文字以内で入力してください').optional(),
    images: isEditMode ? imagesSchema : imagesSchema.min(1, '画像を1枚以上選択してください')
  })

  const defaultValues = {
    caption: defaultCaption,
    images: []
  }

  const {
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors }
  } = useForm<PostFormValues>({
    defaultValues,
    resolver: zodResolver(schema)
  })

  const resetFormOnOpen = () => {
    if (isOpen) {
      reset({
        caption: defaultCaption,
        images: []
      })
    }
  }
  useEffect(resetFormOnOpen, [isOpen, defaultCaption, defaultPostId, reset])

  const images = useWatch({ control, name: 'images' }) ?? []
  const caption = useWatch({ control, name: 'caption' }) ?? ''
  const hasImagesError = !isEditMode && !!errors.images
  const hasCaptionError = !!errors.caption
  const imagesErrorMessage = errors.images?.message
  const captionErrorMessage = errors.caption?.message
  const isSubmitting = isEditMode ? editPostMutation.isPending : createPostMutation.isPending
  const isSubmitDisabled = isEditMode ? false : images.length === 0

  const handleDialogClose = () => {
    setPostFormState(initialPostFormState)
    reset({ caption: '', images: [] })
  }

  const handleFilesChange = (files: File[]) => {
    setValue('images', files)
  }

  const handleCaptionChange = (value: string) => {
    setValue('caption', value)
  }

  const handleSubmitPost = handleSubmit(values => {
    if (isEditMode) {
      const editPostId = defaultPostId
      if (editPostId == null) {
        toast.error('編集対象の投稿が見つかりません。')
        return
      }

      editPostMutation.mutate(
        { id: editPostId, caption: values.caption },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getPosts'] })
            toast.success('投稿を更新しました。')
            handleDialogClose()
          },
          onError: error => {
            console.error(error)
            toast.error('投稿の更新に失敗しました。')
          }
        }
      )

      return
    }

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
      type={mode}
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
      onSubmit={handleSubmitPost}
      onCancel={handleDialogClose}
      onFilesChange={handleFilesChange}
      onCaptionChange={handleCaptionChange}
      caption={caption}
      imageUrls={defaults.imageUrls ?? []}
      isSubmitting={isSubmitting}
      isSubmitDisabled={isSubmitDisabled}
      isImagesError={hasImagesError}
      imagesErrorMessage={imagesErrorMessage}
      isCaptionError={hasCaptionError}
      captionErrorMessage={captionErrorMessage}
    />
  )
}
