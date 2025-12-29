import { Suspense } from 'react'
import { AuthEntryContainer } from '@/features/auth/views/AuthEntryContainer'

export default function AuthEntryPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthEntryContainer />
    </Suspense>
  )
}
