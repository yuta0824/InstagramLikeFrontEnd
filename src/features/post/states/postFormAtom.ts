import { atom } from 'jotai'

export type PostFormMode = 'create' | 'edit'

export type PostFormDefaults = {
  id?: number
  caption?: string
  imageUrls?: string[]
}

export type PostFormState = {
  isOpen: boolean
  mode: PostFormMode
  defaults: PostFormDefaults
}

export const initialPostFormState: PostFormState = {
  isOpen: false,
  mode: 'create',
  defaults: {}
}

export const postFormStateAtom = atom<PostFormState>(initialPostFormState)
