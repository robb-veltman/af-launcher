const settings = window.require('electron-settings')

type KeyPath = ElectronSettings.KeyPath
type SettingsValue = ElectronSettings.SettingsValue

function _makeKeyPath(key: KeyPath) {
  return `afterstrife.launcher.${key}`
}

export async function useSettings() {
  const get = async (key: KeyPath): Promise<SettingsValue> => {
    const value = await settings.get(_makeKeyPath(key))
    return value
  }

  const set = async (key: KeyPath, value: SettingsValue): Promise<void> => {
    await settings.set(_makeKeyPath(key), value)
    return
  }

  const has = async (key: KeyPath): Promise<boolean> => {
    const hasSetting = await settings.has(_makeKeyPath(key))
    return hasSetting
  }
}

