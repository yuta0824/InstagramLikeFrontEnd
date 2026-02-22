import Image from 'next/image'
import Link from 'next/link'

interface PostThumbnailProps {
  postId?: number
  postThumbnailUrl?: string
  postUrl: string
}

export const PostThumbnail = ({ postId, postThumbnailUrl, postUrl }: PostThumbnailProps) => {
  if (postId && postThumbnailUrl) {
    return (
      <Link href={postUrl} className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md">
        <Image src={postThumbnailUrl} alt="対象の投稿" fill unoptimized className="object-cover" />
      </Link>
    )
  }

  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-gray-100">
      <span className="text-[10px] text-gray-800">no post</span>
    </div>
  )
}
