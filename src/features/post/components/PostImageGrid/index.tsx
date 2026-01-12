'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'

type PostImageGridProps = {
  imageUrls: string[]
  getAlt?: (index: number) => string
}

const defaultGetAlt = () => ''

export const PostImageGrid = ({ imageUrls, getAlt = defaultGetAlt }: PostImageGridProps) => {
  return (
    <div
      className={cn(
        'auto-rows-fr gap-2',
        imageUrls.length === 2 && 'grid grid-cols-2',
        imageUrls.length >= 3 && 'grid grid-cols-3'
      )}
    >
      {imageUrls.map((imageUrl, index) => (
        <Image
          key={index}
          src={imageUrl}
          alt={getAlt(index)}
          width={468}
          height={468}
          // TODO: 最適化するとリンク切れになる理由を調査する
          unoptimized
          className={cn('h-full w-full object-cover', imageUrls.length >= 3 && index === 0 && 'col-span-2 row-span-2')}
        />
      ))}
    </div>
  )
}
