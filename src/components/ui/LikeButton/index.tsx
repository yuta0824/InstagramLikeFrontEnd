import { Heart } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '../button'

type LikeButtonProps = {
  liked: boolean
  count: number
  onToggle: (liked: boolean) => void
}

export const LikeButton = ({ count, liked, onToggle }: LikeButtonProps) => {
  return (
    <div className="flex items-center">
      <Button
        variant={'ghost'}
        onClick={() => onToggle(!liked)}
        size="icon"
        className={cn('rounded-full hover:text-rose-600', liked ? 'text-rose-600' : '')}
        aria-label={liked ? 'いいねを取り消す' : 'いいねする'}
      >
        <Heart className="size-5" strokeWidth={2.5} fill={liked ? 'currentColor' : 'none'} aria-hidden />
      </Button>
      <span className="sr-only">いいね数</span>
      <span>{count}</span>
    </div>
  )
}
