import Image from 'next/image'
import { GoogleAuthButton } from '../GoogleAuthButton'
import { GuestLoginButton } from '../GuestLoginButton'

interface AuthEntryProps {
  onAuth: () => void
  onGuestLogin: () => void
  isGuestLoginLoading: boolean
}

export const AuthEntry = ({ onAuth, onGuestLogin, isGuestLoginLoading }: AuthEntryProps) => {
  return (
    <div className="flex h-screen flex-col md:flex-row-reverse md:gap-10">
      <div className="relative h-70 shrink-0 md:h-auto md:flex-1">
        <Image src="/img_login-bg.jpg" alt="" fill className="object-cover" priority />
      </div>
      <div className="mx-auto flex w-fit flex-1 flex-col px-6 py-20 md:items-center md:justify-center">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-medium tracking-tight text-slate-900 md:text-4xl">思い出をシェアしよう</h1>
          <p className="mt-3 text-sm text-slate-500">Googleアカウントでログインして始めましょう。</p>
          <div className="flex flex-col gap-3 pt-8 md:pt-10">
            <GoogleAuthButton onClick={onAuth} />
            <GuestLoginButton onClick={onGuestLogin} isLoading={isGuestLoginLoading} />
          </div>
          <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-700">
            <p className="font-medium">このサイトはデモ版です</p>
            <p className="mt-1">
              データは24時間ごとにリセットされます。
              <br />
              自由に操作してお楽しみください。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
