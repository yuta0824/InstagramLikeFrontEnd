'use client'

import { useState } from 'react'
import { useSetAtom } from 'jotai'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { SkeletonCardList } from '@/components/ui/Skeleton/SkeletonCardList'
import { useCreateComment } from '@/features/comment/api/useCreateComment'
import { useDeleteComment } from '@/features/comment/api/useDeleteComment'
import { useGetPosts } from '../api/useGetPosts'
import { useDeletePost } from '../api/useDeletePost'
import { PostCard } from '../components/PostCard'
import { PostsEmptyState } from '../components/PostsEmptyState'
import { LoadingError } from '@/components/layout/LoadingError'
import { PostShowDialog } from '../components/PostShowDialog'
import type { ApiPostsGet200ResponseInner } from '@instagram-like-app/http-client'
import { postFormStateAtom } from '../states/postFormAtom'

export const PostsContainer = () => {
  const { data, isLoading, error } = useGetPosts()
  const [activePostId, setActivePostId] = useState<number | null>(null)
  const [commentValue, setCommentValue] = useState('')
  const [commentError, setCommentError] = useState('')
  const setPostFormState = useSetAtom(postFormStateAtom)
  const queryClient = useQueryClient()
  const deletePostMutation = useDeletePost()
  const createCommentMutation = useCreateComment()
  const deleteCommentMutation = useDeleteComment()

  if (isLoading) return <SkeletonCardList />
  if (error) return <LoadingError />
  if (!data) return null
  if (data.length === 0) return <PostsEmptyState />

  const activePost = data.find(post => post.id === activePostId) ?? null

  const handleShowDetails = (post: ApiPostsGet200ResponseInner) => {
    setActivePostId(post.id)
    setCommentValue('')
    setCommentError('')
  }

  const handleLikeClick = () => {
    // TODO: いいね機能を実装
    alert('いいね！')
  }

  const handleEdit = (post: ApiPostsGet200ResponseInner) => {
    setPostFormState({
      isOpen: true,
      mode: 'edit',
      defaults: {
        id: post.id,
        caption: post.caption ?? '',
        imageUrls: post.imageUrls
      }
    })
    setActivePostId(null)
  }

  const handleDelete = (post: ApiPostsGet200ResponseInner) => {
    const shouldDelete = confirm('本当に削除しますか？')
    if (shouldDelete) {
      deletePostMutation.mutate(
        { id: post.id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getPosts'] })
            toast.success('投稿を削除しました。')
            if (activePostId === post.id) {
              setActivePostId(null)
            }
          },
          onError: error => {
            console.error(error)
            toast.error('投稿の削除に失敗しました。')
          }
        }
      )
    }
  }

  const handleCommentValueChange = (value: string) => {
    setCommentValue(value)
    if (commentError) {
      setCommentError('')
    }
  }

  const handleCommentSubmit = () => {
    if (createCommentMutation.isPending) return
    if (!activePost) {
      setCommentError('投稿が見つかりません。')
      return
    }
    const trimmedContent = commentValue.trim()
    if (!trimmedContent) {
      setCommentError('コメントを入力してください。')
      return
    }

    createCommentMutation.mutate(
      { postId: activePost.id, content: trimmedContent },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['getPosts'] })
          setCommentValue('')
          setCommentError('')
          toast.success('コメントを送信しました。')
        },
        onError: error => {
          console.error(error)
          setCommentError('コメントの送信に失敗しました。')
        }
      }
    )
  }

  const handleCommentDelete = (commentId: number) => {
    if (!activePost) {
      toast.error('投稿が見つかりません。')
      return
    }
    if (!confirm('コメントを削除しますか？')) return

    deleteCommentMutation.mutate(
      { postId: activePost.id, commentId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['getPosts'] })
          toast.success('コメントを削除しました。')
        },
        onError: error => {
          console.error(error)
          toast.error('コメントの削除に失敗しました。')
        }
      }
    )
  }

  return (
    <div className="space-y-10">
      {data.map(post => (
        <PostCard
          key={post.id}
          id={String(post.id)}
          user={{
            name: post.userName,
            avatarUrl: post.userAvatar ?? undefined,
            accountUrl: `/accounts/${encodeURIComponent(post.userName)}`
          }}
          currentUser={{
            isLiked: post.isLiked,
            isOwner: post.isOwn
          }}
          images={post.imageUrls}
          caption={post.caption ?? ''}
          timeAgo={post.timeAgo}
          likesCount={post.likedCount}
          commentsCount={post.comments.length}
          onLike={handleLikeClick}
          onComment={() => handleShowDetails(post)}
          shareUrl={`${process.env.NEXT_PUBLIC_API_URL}/posts/${post.id}`}
          onEdit={() => handleEdit(post)}
          onDelete={() => handleDelete(post)}
        />
      ))}
      {activePost && (
        <PostShowDialog
          open
          onOpenChange={open => {
            if (!open) {
              setActivePostId(null)
              setCommentValue('')
              setCommentError('')
            }
          }}
          post={{
            id: String(activePost.id),
            imageUrls: activePost.imageUrls,
            user: {
              name: activePost.userName,
              avatarUrl: activePost.userAvatar ?? undefined
            },
            caption: activePost.caption ?? '',
            likes: activePost.likedCount,
            isLiked: activePost.isLiked,
            isOwn: activePost.isOwn
          }}
          comments={activePost.comments.map(comment => ({
            userName: comment.userName,
            userAvatar: comment.userAvatar ?? undefined,
            content: comment.content,
            isOwner: comment.isOwner,
            onDelete: comment.isOwner ? () => handleCommentDelete(comment.id) : undefined
          }))}
          shareUrl={`${process.env.NEXT_PUBLIC_API_URL}/posts/${activePost.id}`}
          onLike={handleLikeClick}
          timeAgo={activePost.timeAgo}
          onEdit={() => handleEdit(activePost)}
          onDelete={() => handleDelete(activePost)}
          commentValue={commentValue}
          onCommentValueChange={handleCommentValueChange}
          onCommentSubmit={handleCommentSubmit}
          commentError={commentError}
        />
      )}
    </div>
  )
}
