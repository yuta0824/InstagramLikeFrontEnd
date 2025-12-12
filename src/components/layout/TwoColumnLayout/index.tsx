import { ReactNode } from 'react'

interface TwoColumnLayoutProps {
  main: ReactNode
  aside: ReactNode
}

export const TwoColumnLayout = ({ main, aside }: TwoColumnLayoutProps) => {
  return (
    <div className="mx-auto max-w-md px-4 lg:grid lg:max-w-4xl lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-12">
      <main className="lg:px-4">{main}</main>
      <aside className="hidden lg:block">{aside}</aside>
    </div>
  )
}
