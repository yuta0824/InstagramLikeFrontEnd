import {
  Configuration,
  ActiveUserApi,
  AuthApi,
  CommentApi,
  LikeApi,
  PostApi,
  RelationshipApi,
  UserApi
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
export const relationshipApi = new RelationshipApi(config)
