'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useSetAtom } from 'jotai'
import { followListStateAtom, initialFollowListState } from '../states/followListAtom'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { SkeletonCardList } from '@/components/ui/Skeleton/SkeletonCardList'
import { LoadingError } from '@/components/layout/LoadingError'
import { PageHeader } from '@/components/layout/PageHeader'
import { ProfileHeader } from '@/features/user/components/ProfileHeader'
import { FollowButton } from '@/features/user/components/FollowButton'
import { PostCard } from '@/features/post/components/PostCard'
import { PostsEmptyState } from '@/features/post/components/PostsEmptyState'
import { PostShowDialog } from '@/features/post/components/PostShowDialog'
import { Spinner } from '@/components/ui/spinner'
import { useSearchUserByName } from '../api/useSearchUserByName'
import { useGetUserDetail } from '../api/useGetUserDetail'
import { useGetUserPosts } from '../api/useGetUserPosts'
import { useGetMe } from '../api/useGetMe'
import { useToggleFollow } from '../api/useToggleFollow'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { useCreateComment } from '@/features/comment/api/useCreateComment'
import { useDeleteComment } from '@/features/comment/api/useDeleteComment'
import { useToggleLike } from '@/features/post/api/useToggleLike'
import { useGetPostDetail } from '@/features/post/api/useGetPostDetail'
import { useDeletePost } from '@/features/post/api/useDeletePost'
import { postFormStateAtom } from '@/features/post/states/postFormAtom'
import { FollowListContainer } from './FollowListContainer'
import type { ApiPostsGet200ResponseInner } from '@instagram-like-app/http-client'

export const UserProfileContainer = () => {
  const router = useRouter()
  const { userName } = useParams<{ userName: string }>()
  const decodedUserName = decodeURIComponent(userName)
  const queryClient = useQueryClient()
  const { data: searchedUser, isLoading: isSearching, error: searchError } = useSearchUserByName(decodedUserName)
  const userId = searchedUser?.id
  const { data: userDetail, isLoading: isLoadingDetail, error: detailError } = useGetUserDetail(userId)
  const { data: me, error: meError } = useGetMe()
  const {
    data: postsData,
    isLoading: isLoadingPosts,
    error: postsError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useGetUserPosts(userId)

  const toggleFollowMutation = useToggleFollow()
  const toggleLikeMutation = useToggleLike()
  const createCommentMutation = useCreateComment()
  const deleteCommentMutation = useDeleteComment()
  const deletePostMutation = useDeletePost()
  const setPostFormState = useSetAtom(postFormStateAtom)
  const setFollowListState = useSetAtom(followListStateAtom)

  useEffect(() => {
    setFollowListState(initialFollowListState)
  }, [decodedUserName, setFollowListState])

  const [activePostId, setActivePostId] = useState<number | null>(null)
  const [commentValue, setCommentValue] = useState('')
  const [commentError, setCommentError] = useState('')
  const { data: postDetail, isLoading: isLoadingPostDetail } = useGetPostDetail(activePostId)

  const sentinelRef = useIntersectionObserver({
    onIntersect: () => fetchNextPage(),
    enabled: !!hasNextPage && !isFetchingNextPage
  })

  if (isSearching || isLoadingDetail) return <SkeletonCardList />
  if (searchError || detailError) return <LoadingError />
  if (!userDetail) return null

  if (meError) console.error(meError)

  const isCurrentUser = !meError && me?.id === userDetail.id
  const allPosts = postsData?.pages.flat() ?? []

  const handleFollowToggle = () => {
    if (toggleFollowMutation.isPending) return
    toggleFollowMutation.mutate(
      { userId: userDetail.id, shouldFollow: !userDetail.isFollowing },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['getUserDetail', userId] })
          queryClient.invalidateQueries({ queryKey: ['searchUserByName', decodedUserName] })
        },
        onError: error => {
          console.error(error)
          toast.error('フォローの更新に失敗しました。')
        }
      }
    )
  }

  const handleShowDetails = (post: ApiPostsGet200ResponseInner) => {
    setActivePostId(post.id)
    setCommentValue('')
    setCommentError('')
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
    if (!confirm('本当に削除しますか？')) return
    deletePostMutation.mutate(
      { id: post.id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['getUserPosts', userId] })
          queryClient.invalidateQueries({ queryKey: ['getUserDetail', userId] })
          toast.success('投稿を削除しました。')
          if (activePostId === post.id) setActivePostId(null)
        },
        onError: error => {
          console.error(error)
          toast.error('投稿の削除に失敗しました。')
        }
      }
    )
  }

  const handleLikeClick = (postId: number, shouldLike: boolean) => {
    if (toggleLikeMutation.isPending) return
    toggleLikeMutation.mutate(
      { postId, shouldLike },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['getUserPosts', userId] })
        },
        onError: error => {
          console.error(error)
          toast.error('いいねの更新に失敗しました。')
        }
      }
    )
  }

  const handleCommentValueChange = (value: string) => {
    setCommentValue(value)
    if (commentError) setCommentError('')
  }

  const handleCommentSubmit = () => {
    if (createCommentMutation.isPending) return
    if (!activePostId) {
      setCommentError('投稿が見つかりません。')
      return
    }
    const trimmed = commentValue.trim()
    if (!trimmed) {
      setCommentError('コメントを入力してください。')
      return
    }
    createCommentMutation.mutate(
      { postId: activePostId, content: trimmed },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['getUserPosts', userId] })
          queryClient.invalidateQueries({ queryKey: ['getPostDetail', activePostId] })
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
    if (!activePostId) {
      toast.error('投稿が見つかりません。')
      return
    }
    if (!confirm('コメントを削除しますか？')) return
    deleteCommentMutation.mutate(
      { postId: activePostId, commentId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['getUserPosts', userId] })
          queryClient.invalidateQueries({ queryKey: ['getPostDetail', activePostId] })
          toast.success('コメントを削除しました。')
        },
        onError: error => {
          console.error(error)
          toast.error('コメントの削除に失敗しました。')
        }
      }
    )
  }

  const activePost = activePostId ? (allPosts.find(p => p.id === activePostId) ?? null) : null

  return (
    <div className="space-y-6">
      <PageHeader
        title={userDetail.name}
        onBack={() => router.back()}
        rightContent={
          !isCurrentUser ? (
            <FollowButton
              isFollowing={userDetail.isFollowing}
              isPending={toggleFollowMutation.isPending}
              onClick={handleFollowToggle}
            />
          ) : undefined
        }
      />

      <ProfileHeader
        avatarUrl={userDetail.avatarUrl ?? undefined}
        userName={userDetail.name}
        stats={{
          posts: { label: '投稿', count: userDetail.postsCount },
          followers: {
            label: 'フォロワー',
            count: userDetail.followersCount,
            onClick: () => setFollowListState({ isOpen: true, type: 'followers' })
          },
          followings: {
            label: 'フォロー中',
            count: userDetail.followingsCount,
            onClick: () => setFollowListState({ isOpen: true, type: 'followings' })
          }
        }}
      />

      {isLoadingPosts ? (
        <SkeletonCardList />
      ) : postsError ? (
        <LoadingError />
      ) : allPosts.length === 0 ? (
        <PostsEmptyState />
      ) : (
        <div className="space-y-10">
          {allPosts.map(post => (
            <PostCard
              key={post.id}
              id={String(post.id)}
              user={{
                name: post.userName,
                avatarUrl: post.userAvatar ?? undefined
              }}
              currentUser={{
                isLiked: post.isLiked,
                isOwner: post.isOwn
              }}
              images={post.imageUrls}
              caption={post.caption ?? ''}
              timeAgo={post.timeAgo}
              likesCount={post.likedCount}
              commentsCount={post.commentsCount}
              onLike={liked => handleLikeClick(post.id, liked)}
              onComment={() => handleShowDetails(post)}
              shareUrl={`${window.location.origin}/posts/${post.id}`}
              onEdit={() => handleEdit(post)}
              onDelete={() => handleDelete(post)}
            />
          ))}
          <div ref={sentinelRef} className="h-4" />
          {isFetchingNextPage && (
            <div className="flex justify-center py-4">
              <Spinner className="size-6" />
            </div>
          )}
        </div>
      )}

      <FollowListContainer />

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
          comments={(postDetail?.comments ?? []).map(comment => ({
            userName: comment.userName,
            userAvatar: comment.userAvatar ?? undefined,
            content: comment.content,
            isOwner: comment.isOwner,
            onDelete: comment.isOwner ? () => handleCommentDelete(comment.id) : undefined
          }))}
          isLoadingComments={isLoadingPostDetail}
          shareUrl={`${window.location.origin}/posts/${activePost.id}`}
          onLike={liked => handleLikeClick(activePost.id, liked)}
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
