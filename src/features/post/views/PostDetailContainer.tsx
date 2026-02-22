'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useSetAtom } from 'jotai'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { SkeletonCardList } from '@/components/ui/Skeleton/SkeletonCardList'
import { LoadingError } from '@/components/layout/LoadingError'
import { useCreateComment } from '@/features/comment/api/useCreateComment'
import { useDeleteComment } from '@/features/comment/api/useDeleteComment'
import { useGetPostDetail } from '../api/useGetPostDetail'
import { TIMELINE_QUERY_KEY } from '../api/useGetTimeline'
import { useDeletePost } from '../api/useDeletePost'
import { useToggleLike } from '../api/useToggleLike'
import { PostDetailView } from '../components/PostDetailView'
import { postFormStateAtom } from '../states/postFormAtom'

export const PostDetailContainer = () => {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const postId = Number(params.id)
  const isValidId = !Number.isNaN(postId) && Number.isInteger(postId) && postId > 0
  const { data: post, isLoading, error } = useGetPostDetail(isValidId ? postId : null)
  const [commentValue, setCommentValue] = useState('')
  const [commentError, setCommentError] = useState('')
  const setPostFormState = useSetAtom(postFormStateAtom)
  const queryClient = useQueryClient()
  const deletePostMutation = useDeletePost()
  const createCommentMutation = useCreateComment()
  const deleteCommentMutation = useDeleteComment()
  const toggleLikeMutation = useToggleLike()

  if (!isValidId) return <LoadingError />
  if (isLoading) return <SkeletonCardList />
  if (error || !post) return <LoadingError />

  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/posts/${post.id}` : `/posts/${post.id}`

  const handleDelete = () => {
    if (!confirm('本当に削除しますか？')) return

    deletePostMutation.mutate(
      { id: post.id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: TIMELINE_QUERY_KEY })
          toast.success('投稿を削除しました。')
          router.push('/home')
        },
        onError: err => {
          console.error(err)
          toast.error('投稿の削除に失敗しました。')
        }
      }
    )
  }

  const handleEdit = () => {
    setPostFormState({
      isOpen: true,
      mode: 'edit',
      defaults: {
        id: post.id,
        caption: post.caption ?? '',
        imageUrls: post.imageUrls
      }
    })
  }

  const handleLike = (shouldLike: boolean) => {
    if (toggleLikeMutation.isPending) return
    toggleLikeMutation.mutate(
      { postId: post.id, shouldLike },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['getPostDetail', post.id] })
        },
        onError: err => {
          console.error(err)
          toast.error('いいねの更新に失敗しました。')
        }
      }
    )
  }

  const handleCommentValueChange = (value: string) => {
    setCommentValue(value)
    if (commentError) {
      setCommentError('')
    }
  }

  const handleCommentSubmit = () => {
    if (createCommentMutation.isPending) return
    const trimmedContent = commentValue.trim()
    if (!trimmedContent) {
      setCommentError('コメントを入力してください。')
      return
    }

    createCommentMutation.mutate(
      { postId: post.id, content: trimmedContent },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['getPostDetail', post.id] })
          setCommentValue('')
          setCommentError('')
          toast.success('コメントを送信しました。')
        },
        onError: err => {
          console.error(err)
          setCommentError('コメントの送信に失敗しました。')
        }
      }
    )
  }

  const handleCommentDelete = (commentId: number) => {
    if (!confirm('コメントを削除しますか？')) return

    deleteCommentMutation.mutate(
      { postId: post.id, commentId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['getPostDetail', post.id] })
          toast.success('コメントを削除しました。')
        },
        onError: err => {
          console.error(err)
          toast.error('コメントの削除に失敗しました。')
        }
      }
    )
  }

  return (
    <PostDetailView
      post={{
        id: String(post.id),
        imageUrls: post.imageUrls,
        user: {
          name: post.userName,
          avatarUrl: post.userAvatar ?? undefined
        },
        caption: post.caption ?? '',
        likes: post.likedCount,
        isLiked: post.isLiked,
        isOwn: post.isOwn
      }}
      comments={post.comments.map(comment => ({
        userName: comment.userName,
        userAvatar: comment.userAvatar ?? undefined,
        content: comment.content,
        isOwner: comment.isOwner,
        onDelete: comment.isOwner ? () => handleCommentDelete(comment.id) : undefined
      }))}
      shareUrl={shareUrl}
      onLike={handleLike}
      onEdit={post.isOwn ? handleEdit : undefined}
      onDelete={post.isOwn ? handleDelete : undefined}
      commentValue={commentValue}
      onCommentValueChange={handleCommentValueChange}
      onCommentSubmit={handleCommentSubmit}
      commentError={commentError}
      timeAgo={post.timeAgo}
    />
  )
}
