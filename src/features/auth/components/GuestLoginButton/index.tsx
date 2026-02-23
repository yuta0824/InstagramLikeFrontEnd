import { UserRound } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface GuestLoginButtonProps {
  onClick: () => void
  isLoading: boolean
}

export const GuestLoginButton = ({ onClick, isLoading }: GuestLoginButtonProps) => {
  return (
    <Button onClick={onClick} disabled={isLoading} variant="outline" size="lg">
      <UserRound className="size-5" />
      {isLoading ? 'ログイン中...' : 'ゲストとしてログイン'}
    </Button>
  )
}
