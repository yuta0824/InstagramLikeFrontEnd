import { GlobalNavigationContainer } from '@/features/layout/views/GlobalNavigationContainer'
import AuthProvider from './_auth-provider'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className="flex">
        <aside>
          <GlobalNavigationContainer />
        </aside>
        <main className="flex-1 py-4">{children}</main>
      </div>
    </AuthProvider>
  )
}
