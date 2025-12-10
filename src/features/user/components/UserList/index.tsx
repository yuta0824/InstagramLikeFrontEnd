'use client'

import { UserListItem, UserListItemProps } from '../UserListItem'

interface UserListProps {
  users: UserListItemProps[]
}

export const UserList = ({ users }: UserListProps) => {
  return (
    <div className="space-y-1">
      {users.map((user) => (
        <UserListItem key={user.name} {...user} />
      ))}
    </div>
  )
}
