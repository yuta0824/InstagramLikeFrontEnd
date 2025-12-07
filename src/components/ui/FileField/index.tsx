'use client'

import { FilePond, registerPlugin } from 'react-filepond'
import type { FilePondFile } from 'filepond'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import { toast } from 'sonner'
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

interface FileFieldProps {
  onChange?: (files: File[]) => void
}

const MAX_FILE_SIZE = 5 * 1024 * 1024
const ALLOWED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']

export const FileField = ({ onChange }: FileFieldProps) => {
  const handleBeforeAddFile = (item: FilePondFile) => {
    const file = item.file as File

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      toast.error('PNG、JPEG、WebP形式の画像のみアップロード可能です')
      return false
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error(`ファイルサイズは5MB以下にしてください（${(file.size / 1024 / 1024).toFixed(1)}MB）`)
      return false
    }

    return true
  }

  return (
    <FilePond
      className="[&_label]:text-sm! [&>.filepond--credits]:hidden"
      onupdatefiles={fileItems => {
        onChange?.(fileItems.map(fileItem => fileItem.file) as File[])
      }}
      allowMultiple={true}
      allowReorder={true}
      maxFiles={3}
      stylePanelLayout="compact"
      {...{
        beforeAddFile: handleBeforeAddFile,
        onwarning: (error: { body: string }) => {
          if (error?.body === 'Max files') {
            toast.error('最大3枚までアップロードできます')
          }
        }
      }}
    />
  )
}
