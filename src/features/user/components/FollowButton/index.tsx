import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

interface FollowButtonProps {
  isFollowing: boolean
  isPending: boolean
  onClick: () => void
}

export const FollowButton = ({ isFollowing, isPending, onClick }: FollowButtonProps) => {
  const label = isFollowing ? 'フォロー中' : 'フォロー'

  return (
    <Button
      variant={isFollowing ? 'outline' : 'default'}
      size="sm"
      disabled={isPending}
      onClick={onClick}
      className="w-20 text-xs"
    >
      {isPending ? <Spinner /> : label}
    </Button>
  )
}
