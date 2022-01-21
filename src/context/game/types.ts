
import { GameMetadata } from 'types'

export type GameInstallState =
  | 'Loading'
  | 'Checking'
  | 'Downloading'
  | 'Installing'
  | 'Up To Date'

export interface State {
  installState: GameInstallState
  metadata?: GameMetadata
  downloadProgress: number
  installProgress: number
}

