import { CommentItem, CommentItemProps } from '../CommentItem'

export interface CommentListProps {
  comments: CommentItemProps[]
}

export const CommentList = ({ comments }: CommentListProps) => {
  return (
    <div className="overflow-y-auto">
      {comments.map((comment, index) => (
        <CommentItem key={index} {...comment} />
      ))}
    </div>
  )
}
