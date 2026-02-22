import { toast } from 'sonner'

const MAX_FILE_SIZE = 5 * 1024 * 1024
const ALLOWED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']

export const ACCEPTED_IMAGE_EXTENSIONS = '.png,.jpg,.jpeg,.webp'

export const validateImageFile = (file: File): boolean => {
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
