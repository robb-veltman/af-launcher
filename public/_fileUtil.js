const fs = require('fs-extra')
const DecompressZip = require('decompress-zip');

const { PATHS } = require('./_paths')

const _ensureAfterStrifeDir = () => {
  fs.ensureDirSync(PATHS.afterStrifeDir)
}

const getAfterStrifeDirContents = () => {
  _ensureAfterStrifeDir()
  return fs.readdirSync(PATHS.afterStrifeDir)
}

const getGameDirContents = () => {
  _ensureAfterStrifeDir()
  return fs.readdirSync(PATHS.gameDir)
}

const deleteZipFile = () => {
  _ensureAfterStrifeDir()
  if (getAfterStrifeDirContents().includes('Game.zip')) {
    fs.unlinkSync(PATHS.gameZip)
  }
}

const clearGameDirectoryContents = () => {
  _ensureAfterStrifeDir()
  if (getAfterStrifeDirContents().includes('Game')) {
    fs.rmdir(PATHS.gameDir, { recursive: true }, (err) => {
      if (err) {
        console.error(error)
        log.error(err)
      }
    })
  }
}

const unzipGame = ({
  onProgress,
  onComplete,
  onError,
}) => {
  const unzipper = new DecompressZip(PATHS.gameZip)
  unzipper.on('error', (error) => {
    onError(error)
  })
  unzipper.on('extract', () => {
    deleteZipFile()
    onComplete()
  })
  unzipper.on('progress', (fileIndex, fileCount) => {
    const progress = fileIndex / fileCount
    onProgress({ progress })
  })
  unzipper.extract({
    path: PATHS.gameDir,
    restrict: false,
  })
}

const FileUtil = {
  getGameDirContents,
  getAfterStrifeDirContents,
  clearGameDirectoryContents,
  unzipGame,
}

module.exports = { FileUtil }
