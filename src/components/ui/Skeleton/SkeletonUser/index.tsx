import { Skeleton } from '@/components/ui/skeleton'

export const SkeletonUser = () => {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 shrink-0 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  )
}
