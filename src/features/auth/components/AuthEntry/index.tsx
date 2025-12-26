import { GoogleAuthButton } from '../GoogleAuthButton'

interface AuthEntryProps {
  onAuth: () => void
}

export const AuthEntry = ({ onAuth }: AuthEntryProps) => {
  return (
    <div className="grid h-screen place-content-center">
      <div className="w-full max-w-sm rounded-2xl border p-8 text-center shadow-sm">
        <h1 className="text-3xl font-medium tracking-tight">Share your memories</h1>
        <p className="mt-4 text-sm text-slate-500">Sign in to continue with your Google account.</p>
        <div className="pt-8">
          <GoogleAuthButton onClick={onAuth} />
        </div>
      </div>
    </div>
  )
}
