import * as FileSystem from 'expo-file-system'
import AsyncStorage from 'react-native'

const callback = (downloadProgress) => {
  const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite
  this.setState({
    downloadProgress: progress,
  })
}

const downloadResumable = FileSystem.createDownloadResumable(
  'http://techslides.com/demos/sample-videos/small.mp4',
  `${FileSystem.documentDirectory}small.mp4`,
  {},
  callback
)

try {
  downloadResumable.downloadAsync()
} catch (e) {
  console.error(e)
}

try {
  downloadResumable.pauseAsync()
  AsyncStorage.setItem('pausedDownload', JSON.stringify(downloadResumable.savable()))
} catch (e) {
  console.error(e)
}

try {
  downloadResumable.resumeAsync()
} catch (e) {
  console.error(e)
}

// To resume a download across app restarts, assuming the the DownloadResumable.savable() object was stored:
const downloadSnapshotJson = AsyncStorage.getItem('pausedDownload')
const downloadSnapshot = JSON.parse(downloadSnapshotJson)
const newDownloadResumable = new FileSystem.DownloadResumable(
  downloadSnapshot.url,
  downloadSnapshot.fileUri,
  downloadSnapshot.options,
  callback,
  downloadSnapshot.resumeData
)

try {
  newDownloadResumable.resumeAsync()
} catch (e) {
  console.error(e)
}