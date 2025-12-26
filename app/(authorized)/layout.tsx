import { GlobalNavigationContainer } from '@/features/layout/views/GlobalNavigationContainer'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <aside>
        <GlobalNavigationContainer />
      </aside>
      <main className="flex-1 py-4">{children}</main>
    </div>
  )
}
