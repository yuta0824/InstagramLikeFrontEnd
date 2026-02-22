import { atom } from 'jotai'

export type ProfileEditState = {
  isOpen: boolean
  openId: number
}

export const initialProfileEditState: ProfileEditState = {
  isOpen: false,
  openId: 0
}

export const profileEditStateAtom = atom<ProfileEditState>(initialProfileEditState)
