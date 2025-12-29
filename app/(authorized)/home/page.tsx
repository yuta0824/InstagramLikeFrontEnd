import { TwoColumnLayout } from '@/components/layout/TwoColumnLayout'
import { PostsContainer } from '@/features/post/views/PostsContainer'
import { UserListContainer } from '@/features/user/views/UserListContainer'

export default function Home() {
  return <TwoColumnLayout main={<PostsContainer />} aside={<UserListContainer />} />
}
