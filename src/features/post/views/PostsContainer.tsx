'use client'

import { useState } from 'react'
import { SkeletonCardList } from '@/components/ui/Skeleton/SkeletonCardList'
import { useGetPosts } from '../api/useGetPosts'
import { PostCard } from '../components/PostCard'
import { PostsEmptyState } from '../components/PostsEmptyState'
import { LoadingError } from '@/components/layout/LoadingError'
import { PostShowDialog } from '../components/PostShowDialog'
import type { ApiPostsGet200ResponseInner } from '@instagram-like-app/http-client'

export const PostsContainer = () => {
  const { data, isLoading, error } = useGetPosts()
  const [activePost, setActivePost] = useState<ApiPostsGet200ResponseInner | null>(null)

  if (isLoading) return <SkeletonCardList />
  if (error) return <LoadingError />
  if (!data) return null
  if (data.length === 0) return <PostsEmptyState />

  const handleShowDetails = (post: ApiPostsGet200ResponseInner) => setActivePost(post)

  const handleLikeClick = () => {
    // TODO: いいね機能を実装
    alert('いいね！')
  }

  const handleEdit = () => {
    // TODO: 投稿編集を実装
    alert('投稿編集機能')
  }

  const handleDelete = () => {
    // TODO: 投稿削除を実装
    alert('投稿削除')
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
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
      {activePost && (
        <PostShowDialog
          open
          onOpenChange={open => {
            if (!open) setActivePost(null)
          }}
          post={{
            id: String(activePost.id),
            imageUrls: activePost.imageUrls,
            user: {
              name: activePost.userName,
              username: activePost.userName,
              avatarUrl: activePost.userAvatar ?? undefined
            },
            caption: activePost.caption ?? '',
            likes: activePost.likedCount,
            isLiked: activePost.isLiked,
            isOwn: activePost.isOwn
          }}
          comments={activePost.comments.map(comment => ({
            user: {
              name: comment.userName,
              username: comment.userName,
              avatarUrl: comment.userAvatar ?? undefined
            },
            content: comment.content
          }))}
          shareUrl={`${process.env.NEXT_PUBLIC_API_URL}/posts/${activePost.id}`}
          onLike={handleLikeClick}
          timeAgo={activePost.timeAgo}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  )
}
