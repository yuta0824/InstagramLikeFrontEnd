'use client'

import { BackButton } from '@/components/ui/BackButton'

export interface PageHeaderProps {
  title: string
  onBack: () => void
  rightContent?: React.ReactNode
  isFixed?: boolean
}

export const PageHeader = ({ title, onBack, rightContent, isFixed }: PageHeaderProps) => {
  return (
    <header
      className={`grid h-12 grid-cols-[1fr_3fr_1fr] items-center gap-2 border-b border-gray-200 px-4 py-2 ${
        isFixed ? 'fixed top-0 right-0 left-0 z-50 bg-white/20 backdrop-blur-md' : 'bg-white'
      }`}
    >
      <BackButton onClick={onBack} />
      <h1 className="truncate text-center">{title}</h1>
      <div className="flex items-center justify-end">{rightContent}</div>
    </header>
  )
}
