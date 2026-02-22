import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { SkeletonUserList } from '@/components/ui/Skeleton/SkeletonUserList'
import { LoadingError } from '@/components/layout/LoadingError'
import { Spinner } from '@/components/ui/spinner'
import { UserList } from '../UserList'
import type { UserListItemProps } from '../UserListItem'

interface UserListDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  users: UserListItemProps[]
  isLoading: boolean
  isError: boolean
  isFetchingNextPage: boolean
  sentinelRef: React.RefObject<HTMLDivElement | null>
}

const DialogBody = ({
  users,
  isLoading,
  isError,
  isFetchingNextPage,
  sentinelRef
}: Omit<UserListDialogProps, 'open' | 'onOpenChange' | 'title'>) => {
  if (isLoading) return <SkeletonUserList />
  if (isError) return <LoadingError />
  if (users.length === 0) {
    return <p className="text-muted-foreground py-10 text-center text-sm">ユーザーがいません。</p>
  }

  return (
    <>
      <UserList users={users} />
      <div ref={sentinelRef} className="h-4" />
      {isFetchingNextPage && (
        <div className="flex justify-center py-4">
          <Spinner className="size-6" />
        </div>
      )}
    </>
  )
}

export const UserListDialog = ({ open, onOpenChange, title, ...bodyProps }: UserListDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[70vh] flex-col gap-0 p-0">
        <DialogHeader className="border-b px-6 py-4">
          <DialogTitle className="text-center">{title}</DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto px-6 py-2">
          <DialogBody {...bodyProps} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
