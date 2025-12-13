import { PostComment, PostCommentProps } from '../PostComment'

export interface PostCommentListProps {
  comments: PostCommentProps[]
}

export const PostCommentList = ({ comments }: PostCommentListProps) => {
  return (
    <div className="overflow-y-auto">
      {comments.map((comment, index) => (
        <PostComment key={index} {...comment} />
      ))}
    </div>
  )
}
