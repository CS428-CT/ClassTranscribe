

const callback = downloadProgress => {
    const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
    this.setState({
      downloadProgress: progress,
    });
  };
  
  const downloadResumable = FileSystem.createDownloadResumable(
    'http://techslides.com/demos/sample-videos/small.mp4',
    FileSystem.documentDirectory + 'small.mp4',
    {},
    callback
  );
  
  try {
    const { uri } = await downloadResumable.downloadAsync();
    console.log('Finished downloading to ', uri);
  } catch (e) {
    console.error(e);
  }
  
  try {
    await downloadResumable.pauseAsync();
    console.log('Paused download operation, saving for future retrieval');
    AsyncStorage.setItem('pausedDownload', JSON.stringify(downloadResumable.savable()));
  } catch (e) {
    console.error(e);
  }
  
  try {
    const { uri } = await downloadResumable.resumeAsync();
    console.log('Finished downloading to ', uri);
  } catch (e) {
    console.error(e);
  }
  
  //To resume a download across app restarts, assuming the the DownloadResumable.savable() object was stored:
  const downloadSnapshotJson = await AsyncStorage.getItem('pausedDownload');
  const downloadSnapshot = JSON.parse(downloadSnapshotJson);
  const downloadResumable = new FileSystem.DownloadResumable(
    downloadSnapshot.url,
    downloadSnapshot.fileUri,
    downloadSnapshot.options,
    callback,
    downloadSnapshot.resumeData
  );
  
  try {
    const { uri } = await downloadResumable.resumeAsync();
    console.log('Finished downloading to ', uri);
  } catch (e) {
    console.error(e);
  }