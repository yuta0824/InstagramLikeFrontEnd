import Image from 'next/image'
import { GoogleAuthButton } from '../GoogleAuthButton'

interface AuthEntryProps {
  onAuth: () => void
}

export const AuthEntry = ({ onAuth }: AuthEntryProps) => {
  return (
    <div className="flex h-screen flex-col md:flex-row-reverse md:gap-10">
      <div className="relative h-70 shrink-0 md:h-auto md:flex-1">
        <Image src="/img_login-bg.png" alt="" fill className="object-cover" priority />
      </div>
      <div className="mx-auto flex w-fit flex-1 flex-col px-6 py-20 md:items-center md:justify-center">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-medium tracking-tight text-slate-900 md:text-4xl">思い出をシェアしよう</h1>
          <p className="mt-3 text-sm text-slate-500">Googleアカウントでログインして始めましょう。</p>
          <div className="pt-8 md:pt-10">
            <GoogleAuthButton onClick={onAuth} />
          </div>
        </div>
      </div>
    </div>
  )
}
