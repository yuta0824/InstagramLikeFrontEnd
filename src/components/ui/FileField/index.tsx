'use client'

import { FilePond, registerPlugin } from 'react-filepond'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

interface FileFieldProps {
  onChange?: (files: File[]) => void
}

export const FileField = ({ onChange }: FileFieldProps) => {
  return (
    <FilePond
      onupdatefiles={fileItems => {
        onChange?.(fileItems.map(fileItem => fileItem.file) as File[])
      }}
      allowMultiple={true}
      allowReorder={true}
      maxFiles={3}
      {...{
        onwarning: error => {
          if (error?.body === 'Max files') alert('最大3枚までアップロードできます')
        }
      }}
    />
  )
}
