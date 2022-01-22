
import { GameMetadata } from 'types'

export type GameUpdateState =
  | 'Loading'
  | 'Checking'
  | 'Downloading'
  | 'Installing'
  | 'Up To Date'

export interface State {
  metadata?: GameMetadata
  updateState: GameUpdateState
  downloadProgress: number
  installProgress: number
}

