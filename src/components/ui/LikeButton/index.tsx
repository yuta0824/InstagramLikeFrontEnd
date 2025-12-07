import { Heart } from 'lucide-react'
import { cn } from '@/lib/utils'

type LikeButtonProps = {
  liked: boolean
  count: number
  onToggle: (liked: boolean) => void
}

export const LikeButton = ({ count, liked, onToggle }: LikeButtonProps) => {
  return (
    <button
      onClick={() => onToggle(!liked)}
      className={cn('flex items-center gap-1 hover:text-rose-600', liked ? 'text-rose-600' : '')}
    >
      <Heart className="size-5" strokeWidth={2.5} fill={liked ? 'currentColor' : 'none'} aria-hidden />
      <span className="sr-only">いいね数</span>
      <span className="tabular-nums">{count}</span>
    </button>
  )
}
