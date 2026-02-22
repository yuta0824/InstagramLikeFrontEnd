import { atom } from 'jotai'

export type FollowListType = 'followers' | 'followings'

export type FollowListState = {
  isOpen: boolean
  type: FollowListType
}

export const initialFollowListState: FollowListState = {
  isOpen: false,
  type: 'followers'
}

export const followListStateAtom = atom<FollowListState>(initialFollowListState)
