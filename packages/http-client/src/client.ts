import {
  Configuration,
  ActiveUserApi,
  AuthApi,
  CommentApi,
  LikeApi,
  NotificationApi,
  PostApi,
  RelationshipApi,
  TimelineApi,
  UserApi,
  UserFollowerApi,
  UserFollowingApi,
  UserPostApi
} from './generated'

const basePath = process.env.NEXT_PUBLIC_API_URL
if (!basePath) {
  throw new Error('set env value: NEXT_PUBLIC_API_URL')
}

const config = new Configuration({
  basePath
})

export const activeUserApi = new ActiveUserApi(config)
export const authApi = new AuthApi(config)
export const userApi = new UserApi(config)
export const postApi = new PostApi(config)
export const commentApi = new CommentApi(config)
export const likeApi = new LikeApi(config)
export const notificationApi = new NotificationApi(config)
export const relationshipApi = new RelationshipApi(config)
export const userFollowerApi = new UserFollowerApi(config)
export const userFollowingApi = new UserFollowingApi(config)
export const timelineApi = new TimelineApi(config)
export const userPostApi = new UserPostApi(config)
