import { Heart } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '../button'

type LikeButtonProps = {
  isLiked: boolean
  count: number
  onToggle: (isLiked: boolean) => void
}

export const LikeButton = ({ count, isLiked, onToggle }: LikeButtonProps) => {
  return (
    <div className="flex items-center">
      <Button
        variant={'ghost'}
        onClick={() => onToggle(!isLiked)}
        size="icon"
        className={cn('rounded-full hover:text-rose-600', isLiked ? 'text-rose-600' : '')}
        aria-label={isLiked ? 'いいねを取り消す' : 'いいねする'}
      >
        <Heart className="size-5" strokeWidth={2.5} fill={isLiked ? 'currentColor' : 'none'} aria-hidden />
      </Button>
      <span className="sr-only">いいね数</span>
      <span>{count}</span>
    </div>
  )
}
