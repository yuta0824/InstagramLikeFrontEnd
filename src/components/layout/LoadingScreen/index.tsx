import { Spinner } from '@/components/ui/spinner'

export const LoadingScreen = () => {
  return (
    <div className="grid h-screen w-screen place-content-center">
      <Spinner className="size-12" />
    </div>
  )
}
