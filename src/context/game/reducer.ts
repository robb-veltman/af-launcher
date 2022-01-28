import { Reducer } from 'react'
import { State } from './types'

export type Action =
  | { tag: 'Install.Check' }
  | { tag: 'Install.Download.Start' }
  | { tag: 'Install.Download.Progress', progress: number }
  | { tag: 'Install.Download.Complete' }
  | { tag: 'Install.Install.Start' }
  | { tag: 'Install.Install.Progress', progress: number }
  | { tag: 'Install.Install.Complete' }
  | { tag: 'Install.Reinstall'}

export const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.tag) {
    case 'Install.Check': {
      return { ...state, updateState: 'Checking' }
    }
    case 'Install.Download.Start': {
      return { ...state, updateState: 'Downloading' }
    }
    case 'Install.Download.Progress': {
      return { ...state, downloadProgress: action.progress }
    }
    case 'Install.Download.Complete': {
      return { ...state, downloadProgress: 1 }
    }
    case 'Install.Install.Start': {
      return { ...state, updateState: 'Installing' }
    }
    case 'Install.Install.Progress': {
      return { ...state, installProgress: action.progress }
    }
    case 'Install.Install.Complete': {
      return { ...state, installProgress: 1, updateState: 'Up To Date' }
    }
    case 'Install.Reinstall': {
      return {
        ...state,
        installProgress: 0,
        downloadProgress: 0,
        updateState: 'Checking',
      }
    }
    default:
      return state
  }
}