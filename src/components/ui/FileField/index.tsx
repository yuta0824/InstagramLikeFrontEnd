'use client'

import { FilePond, registerPlugin } from 'react-filepond'
import type { FilePondFile } from 'filepond'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import { toast } from 'sonner'
import { validateImageFile } from '@/utils/image-validation'
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

interface FileFieldProps {
  onChange?: (files: File[]) => void
}

export const FileField = ({ onChange }: FileFieldProps) => {
  const handleBeforeAddFile = (item: FilePondFile) => {
    return validateImageFile(item.file as File)
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
