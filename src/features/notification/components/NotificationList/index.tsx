'use client'

import type { ReactNode } from 'react'

interface NotificationListProps {
  children: ReactNode
}

export const NotificationList = ({ children }: NotificationListProps) => {
  return <div className="space-y-4">{children}</div>
}
