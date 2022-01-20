import settings from 'electron-settings'

declare global {
  namespace ElectronSettings {
    type KeyPath = Parameters<typeof settings.get>[0]
    type SettingsValue = ReturnType<typeof settings.getSync>
  }
}