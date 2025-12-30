import { Suspense } from 'react'
import { AuthEntryContainer } from '@/features/auth/views/AuthEntryContainer'
import { LoadingScreen } from '@/components/layout/LoadingScreen'

export default function AuthEntryPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <AuthEntryContainer />
    </Suspense>
  )
}
