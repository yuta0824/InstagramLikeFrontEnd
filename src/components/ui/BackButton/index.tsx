import { GoArrowLeft } from 'react-icons/go'
import { Button } from '../button'

interface BackButtonProps {
  onClick: () => void
}

export const BackButton = ({ onClick }: BackButtonProps) => {
  return (
    <Button variant={'ghost'} onClick={onClick} size="icon" className="rounded-full" aria-label="戻る">
      <GoArrowLeft className="size-5" />
    </Button>
  )
}
