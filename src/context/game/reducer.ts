import { Reducer } from 'react'
import { State } from './types'

export type Action =
  | { tag: 'Install.Check' }
  | { tag: 'Install.Download.Start' }

export const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.tag) {
    case 'Install.Check': {
      return {
        ...state,
        installState: 'Checking',
      }
    }
    case 'Install.Download.Start': {
      return {
        ...state,
        installState: 'Downloading',
      }
    }
    default:
      return state
  }
}