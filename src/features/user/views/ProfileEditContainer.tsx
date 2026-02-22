'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAtom } from 'jotai'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { profileEditStateAtom } from '../states/profileEditAtom'
import { useGetMe } from '../api/useGetMe'
import { useUpdateProfile } from '../api/useUpdateProfile'
import { ProfileEditDialog } from '../components/ProfileEditDialog'
import type { ApiMeGet200Response } from '@instagram-like-app/http-client'

export const ProfileEditContainer = () => {
  const [profileEditState, setProfileEditState] = useAtom(profileEditStateAtom)
  const { data: me } = useGetMe()

  const handleClose = useCallback(() => {
    setProfileEditState(prev => ({ ...prev, isOpen: false }))
  }, [setProfileEditState])

  return (
    <ProfileEditForm key={profileEditState.openId} isOpen={profileEditState.isOpen} me={me} onClose={handleClose} />
  )
}

interface ProfileEditFormProps {
  isOpen: boolean
  me: ApiMeGet200Response | undefined
  onClose: () => void
}

const ProfileEditForm = ({ isOpen, me, onClose }: ProfileEditFormProps) => {
  const updateProfileMutation = useUpdateProfile()
  const queryClient = useQueryClient()

  const [nameValue, setNameValue] = useState(me?.name ?? '')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string | undefined>(me?.avatarUrl ?? undefined)
  const [shouldRemoveAvatar, setShouldRemoveAvatar] = useState(false)
  const [nameError, setNameError] = useState('')

  // blob URLのクリーンアップ
  useEffect(() => {
    const url = avatarPreviewUrl
    return () => {
      if (url?.startsWith('blob:')) {
        URL.revokeObjectURL(url)
      }
    }
  }, [avatarPreviewUrl])

  const handleFileSelect = useCallback((file: File) => {
    setSelectedFile(file)
    setAvatarPreviewUrl(URL.createObjectURL(file))
    setShouldRemoveAvatar(false)
  }, [])

  const handleRemoveAvatar = useCallback(() => {
    setAvatarPreviewUrl(undefined)
    setShouldRemoveAvatar(true)
    setSelectedFile(null)
  }, [])

  const handleNameChange = useCallback(
    (value: string) => {
      setNameValue(value)
      if (nameError) setNameError('')
    },
    [nameError]
  )

  const hasChanges = nameValue !== (me?.name ?? '') || selectedFile !== null || shouldRemoveAvatar

  const handleSave = () => {
    const trimmedName = nameValue.trim()
    if (!trimmedName) {
      setNameError('名前を入力してください。')
      return
    }

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
        onClose()
      },
      onError: error => {
        console.error(error)
        toast.error('プロフィールの更新に失敗しました。')
      }
    })
  }

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open) onClose()
    },
    [onClose]
  )

  const hasAvatar = shouldRemoveAvatar ? false : !!(avatarPreviewUrl || me?.avatarUrl)

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
      onSave={handleSave}
      onCancel={onClose}
      isSubmitting={updateProfileMutation.isPending}
      hasChanges={hasChanges}
      hasAvatar={hasAvatar}
      nameError={nameError}
    />
  )
}
