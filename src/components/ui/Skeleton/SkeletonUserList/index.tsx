import { SkeletonUser } from '@/components/ui/Skeleton/SkeletonUser'

export const SkeletonUserList = () => {
  return (
    <div className="space-y-8">
      {Array.from({ length: 5 }, (_, i) => (
        <SkeletonUser key={i} />
      ))}
    </div>
  )
}
