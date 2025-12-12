import { SkeletonCard } from '@/components/ui/Skeleton/SkeletonCard'

export const SkeletonCardList = () => {
  return (
    <div className="space-y-10">
      {Array.from({ length: 10 }, (_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}
