import { FcGoogle } from 'react-icons/fc'
import { Button } from '@/components/ui/button'

interface GoogleAuthButtonProps {
  onClick: () => void
}

export const GoogleAuthButton = ({ onClick }: GoogleAuthButtonProps) => {
  return (
    <Button onClick={onClick} size="lg">
      <FcGoogle />
      Googleでログイン
    </Button>
  )
}
