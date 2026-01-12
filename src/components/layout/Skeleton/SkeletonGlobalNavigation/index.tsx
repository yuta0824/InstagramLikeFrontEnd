'use client'

import { Skeleton } from '@/components/ui/skeleton'

export const SkeletonGlobalNavigation = () => {
  return (
    <nav className="fixed right-0 bottom-0 left-0 z-50 border-t border-gray-200 bg-white backdrop-blur-sm md:sticky md:top-0 md:h-screen md:w-16 md:border-t-0 md:border-r md:px-2 md:py-6 xl:w-64 xl:px-4">
      <div className="mx-auto flex max-w-80 flex-row items-center justify-around py-2 md:h-full md:flex-col md:justify-start md:gap-3 md:py-0">
        <Skeleton className="my-2 size-6 rounded-full xl:h-4 xl:w-30" />
        <Skeleton className="my-2 size-6 rounded-full xl:h-4 xl:w-30" />
        <Skeleton className="my-2 size-6 rounded-full xl:h-4 xl:w-30" />
        <Skeleton className="my-2 size-6 rounded-full xl:h-4 xl:w-30" />
        <Skeleton className="my-2 size-6 rounded-full xl:h-4 xl:w-30" />
      </div>
    </nav>
  )
}
