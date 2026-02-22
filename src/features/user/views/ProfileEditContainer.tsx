'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAtom } from 'jotai'
import { useQueryClient } from '@tanstack/react-query'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { ResponseError } from '@instagram-like-app/http-client'
import { profileEditOpenAtom } from '../states/profileEditAtom'
import { useGetMe } from '../api/useGetMe'
import { useUpdateProfile } from '../api/useUpdateProfile'
import { ProfileEditDialog } from '../components/ProfileEditDialog'

const MAX_FILE_SIZE = 5 * 1024 * 1024
const ALLOWED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']

const schema = z.object({
  name: z.string().min(1, '名前を入力してください。')
})

type ProfileFormValues = {
  name: string
}

export const ProfileEditContainer = () => {
  const [isOpen, setIsOpen] = useAtom(profileEditOpenAtom)
  const { data: me } = useGetMe()
  const updateProfileMutation = useUpdateProfile()
  const queryClient = useQueryClient()

  const {
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors }
  } = useForm<ProfileFormValues>({
    defaultValues: { name: me?.name ?? '' },
    resolver: zodResolver(schema)
  })

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string | undefined>(me?.avatarUrl ?? undefined)
  const [shouldRemoveAvatar, setShouldRemoveAvatar] = useState(false)
  const [prevIsOpen, setPrevIsOpen] = useState(false)

  if (isOpen && !prevIsOpen) {
    setPrevIsOpen(true)
    setAvatarPreviewUrl(me?.avatarUrl ?? undefined)
    setSelectedFile(null)
    setShouldRemoveAvatar(false)
  }
  if (!isOpen && prevIsOpen) {
    setPrevIsOpen(false)
  }

  useEffect(() => {
    if (isOpen) {
      reset({ name: me?.name ?? '' })
    }
  }, [isOpen, me?.name, reset])

  useEffect(() => {
    const url = avatarPreviewUrl
    return () => {
      if (url?.startsWith('blob:')) {
        URL.revokeObjectURL(url)
      }
    }
  }, [avatarPreviewUrl])

  const nameValue = useWatch({ control, name: 'name' }) ?? ''
  const nameError = errors.name?.message

  const handleClose = useCallback(() => setIsOpen(false), [setIsOpen])

  const handleNameChange = (value: string) => {
    setValue('name', value, { shouldValidate: !!errors.name })
  }

  const handleFileSelect = useCallback((file: File) => {
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      toast.error('PNG、JPEG、WebP形式の画像のみアップロード可能です')
      return
    }
    if (file.size > MAX_FILE_SIZE) {
      toast.error(`ファイルサイズは5MB以下にしてください（${(file.size / 1024 / 1024).toFixed(1)}MB）`)
      return
    }
    setSelectedFile(file)
    setAvatarPreviewUrl(URL.createObjectURL(file))
    setShouldRemoveAvatar(false)
  }, [])

  const handleRemoveAvatar = useCallback(() => {
    setAvatarPreviewUrl(undefined)
    setShouldRemoveAvatar(true)
    setSelectedFile(null)
  }, [])

  const hasChanges = nameValue.trim() !== (me?.name ?? '') || selectedFile !== null || shouldRemoveAvatar
  const hasAvatar = shouldRemoveAvatar ? false : !!(avatarPreviewUrl || me?.avatarUrl)

  const onSubmit = handleSubmit(({ name }) => {
    const trimmedName = name.trim()
    const params: { avatar?: File; name?: string; removeAvatar?: boolean } = {}

    if (trimmedName !== me?.name) {
      params.name = trimmedName
    }
    if (selectedFile) {
      params.avatar = selectedFile
    }
    if (shouldRemoveAvatar) {
      params.removeAvatar = true
    }

    updateProfileMutation.mutate(params, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['getMe'] })
        queryClient.invalidateQueries({ queryKey: ['searchUserByName'] })
        queryClient.invalidateQueries({ queryKey: ['getUserDetail'] })
        toast.success('プロフィールを更新しました。')
        handleClose()
      },
      onError: async error => {
        console.error(error)
        if (error instanceof ResponseError) {
          try {
            const body = await error.response.json()
            const message = body?.error || body?.message
            if (message) {
              toast.error(message)
              return
            }
          } catch {
            // JSONパース失敗時はフォールバック
          }
        }
        toast.error('プロフィールの更新に失敗しました。')
      }
    })
  })

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open && !updateProfileMutation.isPending) handleClose()
    },
    [handleClose, updateProfileMutation.isPending]
  )

  return (
    <ProfileEditDialog
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
      avatarPreviewUrl={avatarPreviewUrl}
      userName={me?.name ?? ''}
      nameValue={nameValue}
      onNameChange={handleNameChange}
      onFileSelect={handleFileSelect}
      onRemoveAvatar={handleRemoveAvatar}
      onSave={onSubmit}
      onCancel={handleClose}
      isSubmitting={updateProfileMutation.isPending}
      hasChanges={hasChanges}
      hasAvatar={hasAvatar}
      nameError={nameError}
    />
  )
}
