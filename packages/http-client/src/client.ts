import { Configuration, DefaultApi, PostApi, UserApi } from './generated'

const basePath = process.env.NEXT_PUBLIC_API_URL
if (!basePath) {
  throw new Error('set env value: NEXT_PUBLIC_API_URL')
}

const config = new Configuration({
  basePath
})

export const userApi = new UserApi(config)
export const postApi = new PostApi(config)
export const commentApi = new DefaultApi(config)
