import { useRef } from 'react'
import { ACCEPTED_IMAGE_EXTENSIONS } from '@/utils/image-validation'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarImage, DefaultAvatarFallback } from '@/components/ui/avatar'

export interface ProfileEditDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  avatarPreviewUrl?: string
  userName: string
  nameValue: string
  onNameChange: (value: string) => void
  onFileSelect: (file: File) => void
  onRemoveAvatar: () => void
  onSave: () => void
  onCancel: () => void
  isSubmitting: boolean
  hasChanges: boolean
  hasAvatar: boolean
  nameError?: string
}

export const ProfileEditDialog = ({
  isOpen,
  onOpenChange,
  avatarPreviewUrl,
  userName,
  nameValue,
  onNameChange,
  onFileSelect,
  onRemoveAvatar,
  onSave,
  onCancel,
  isSubmitting,
  hasChanges,
  hasAvatar,
  nameError
}: ProfileEditDialogProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      onFileSelect(file)
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>プロフィールを編集</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-3">
          <Avatar key={avatarPreviewUrl ?? 'no-avatar'} className="size-32">
            {avatarPreviewUrl && (
              <AvatarImage
                src={avatarPreviewUrl}
                alt={`${userName}のアバター`}
                className="aspect-square object-cover"
              />
            )}
            <DefaultAvatarFallback />
          </Avatar>

          <div className="flex flex-col items-center gap-1">
            <input
              ref={fileInputRef}
              type="file"
              accept={ACCEPTED_IMAGE_EXTENSIONS}
              onChange={handleFileChange}
              className="hidden"
            />
            <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
              写真をアップロード
            </Button>
            <button
              type="button"
              onClick={onRemoveAvatar}
              disabled={!hasAvatar}
              className="text-sm text-red-500 hover:text-red-600 disabled:pointer-events-none disabled:text-red-300"
            >
              写真を削除
            </button>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <label htmlFor="profile-name" className="text-sm font-medium">
            名前
          </label>
          <Input
            id="profile-name"
            value={nameValue}
            onChange={e => onNameChange(e.target.value)}
            placeholder="名前を入力"
          />
          {nameError && <p className="text-sm text-red-500">{nameError}</p>}
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
            キャンセル
          </Button>
          <Button type="button" onClick={onSave} disabled={isSubmitting || !hasChanges}>
            {isSubmitting ? '保存中...' : '保存'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
