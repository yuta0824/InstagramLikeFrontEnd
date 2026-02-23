import { GlobalNavigationContainer } from '@/features/layout/views/GlobalNavigationContainer'
import AuthProvider from './_auth-provider'
import { PostFormContainer } from '@/features/post/views/PostFormContainer'
import { ProfileEditContainer } from '@/features/user/views/ProfileEditContainer'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className="flex">
        <aside>
          <GlobalNavigationContainer />
        </aside>
        <main className="mb-14 flex-1 py-4 md:mb-0">{children}</main>
      </div>
      <PostFormContainer />
      <ProfileEditContainer />
    </AuthProvider>
  )
}
