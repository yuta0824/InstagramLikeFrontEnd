import { ReactNode } from 'react'

interface SingleColumnLayoutProps {
  children: ReactNode
}

export const SingleColumnLayout = ({ children }: SingleColumnLayoutProps) => {
  return <div className="mx-auto max-w-lg px-4">{children}</div>
}
