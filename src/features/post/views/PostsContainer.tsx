'use client'

import { SkeletonCardList } from '@/components/ui/Skeleton/SkeletonCardList'
import { useGetPosts } from '../modules/useGetPosts'
import { PostCard } from '../components/PostCard'
import { PostsEmptyState } from '../components/PostsEmptyState'
import { LoadingError } from '@/components/layout/LoadingError'

export const PostsContainer = () => {
  const { data, isLoading, error } = useGetPosts()

  if (isLoading) return <SkeletonCardList />
  if (error) return <LoadingError />
  if (!data) return null
  if (data.length === 0) return <PostsEmptyState />

  const handleShowDetails = () => {
    // TODO: dialog open実装
    alert('詳細を表示')
  }

  const handleLikeClick = () => {
    // TODO: いいね機能を実装
    alert('いいね！')
  }

  return (
    <div className="space-y-10">
      {data.map(post => (
        <PostCard
          key={post.id}
          id={String(post.id)}
          user={{
            name: post.userName,
            avatarUrl: post.userAvatar || undefined,
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
          onComment={handleShowDetails}
          shareUrl={`${process.env.NEXT_PUBLIC_API_URL}/posts/${post.id}`}
        />
      ))}
    </div>
  )
}
