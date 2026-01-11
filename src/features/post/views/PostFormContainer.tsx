import { PostFormDialog } from '../components/PostFormDialog'

export const PostFormContainer = () => {
  return (
    <PostFormDialog
      isOpen={false}
      onOpenChange={function (isOpen: boolean): void {
        throw new Error('Function not implemented.')
      }}
    />
  )
}
