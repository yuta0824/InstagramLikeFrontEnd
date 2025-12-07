import { Button } from '../button'
import { FiMessageSquare } from 'react-icons/fi'

interface CommentButtonProps {
  count: number
  onClick: () => void
}

export const CommentButton = ({ count, onClick }: CommentButtonProps) => {
  return (
    <div className="flex items-center">
      <Button
        variant={'ghost'}
        onClick={onClick}
        size="icon"
        className="rounded-full"
        aria-label="コメントページへ進む"
      >
        <FiMessageSquare className="size-4 shrink-0" aria-hidden="true" />
      </Button>
      <span className="sr-only">コメント数</span>
      <span>{count}</span>
    </div>
  )
}
