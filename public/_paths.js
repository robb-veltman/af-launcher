const path = require('path')
const { app } = require('electron')

const _appData = app.getPath('appData')
const _afterStrifeDir = path.join(_appData, '/AfterStrife')
const _gameDir = path.join(_afterStrifeDir, '/Game')
const _gameZip = path.join(_afterStrifeDir, '/Game.zip')
const _gameExe = path.join(_gameDir, '/AfterStrife.exe')
const _metaData = path.join(_gameDir, '/metadata.json')

const PATHS = {
  index: `${path.join(__dirname, '../build/index.html')}`,
  appData: _appData,
  afterStrifeDir: _afterStrifeDir,
  gameDir: _gameDir,
  gameZip: _gameZip,
  gameExe: _gameExe,
  metadata: _metaData,
}

console.log('PATHS:', PATHS)

module.exports =  { PATHS }
