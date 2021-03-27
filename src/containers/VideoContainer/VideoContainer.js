/* eslint no-shadow: ["error", { "allow": ["status"] }] */
/* eslint-env es6 */
import React, { useRef, useState } from 'react'
import { View } from 'react-native'
import { Button, Modal, ProgressBar, Text } from 'react-native-paper'
import { Video } from 'expo-av'
import PropTypes from 'prop-types'
import * as FileSystem from 'expo-file-system'

import styles from './VideoContainer.style'

const VideoContainer = ({ url }) => {
  const video = useRef(null)
  const [status, setStatus] = useState({
    isMuted: false,
    isPlaying: false,
    rate: 1.0,
  })

  const [downloadProgress, setDownloadProgress] = useState(0)

  const downloadVideo = async () => {
    const tokens = url.split('/')
    const fileName = tokens[tokens.length - 1]
    const localUri = FileSystem.documentDirectory + fileName

    const callback = (currDownloadProgress) => {
      const progress =
        currDownloadProgress.totalBytesWritten / currDownloadProgress.totalBytesExpectedToWrite
      setDownloadProgress(progress)
    }

    const downloadResumable = FileSystem.createDownloadResumable(url, localUri, {}, callback)

    try {
      const { uri } = await downloadResumable.downloadAsync()
      // eslint-disable-next-line no-console
      console.log('Finished downloading to ', uri)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.input}>
          <Text label="Video URI" value={url} />
        </View>
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: url,
          }}
          useNativeControls
          resizeMode="contain"
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />

        <View style={styles.buttons}>
          <Button
            mode="contained"
            onPress={() =>
              status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
            }
          >
            {status.isPlaying ? 'Pause' : 'Play'}
          </Button>
          <Button mode="contained" onPress={() => video.current.setIsMutedAsync(!status.isMuted)}>
            {status.isMuted ? 'Unmute' : 'Mute'}
          </Button>
        </View>

        <View style={styles.input}>
          <Button
            mode="contained"
            onPress={() => video.current.setRateAsync(status.rate - 0.1, true)}
          >
            Decrease Rate
          </Button>
          <Text>Play Rate: {status.rate}</Text>
          <Button
            mode="contained"
            onPress={() => video.current.setRateAsync(status.rate + 0.1, true)}
          >
            Increase Rate
          </Button>
        </View>

        <View style={styles.buttons}>
          <Button
            mode="contained"
            onPress={() => video.current.setPositionAsync(status.positionMillis - 5 * 1000)}
          >
            - 5s
          </Button>
          <Button
            mode="contained"
            onPress={() => video.current.setPositionAsync(status.positionMillis + 5 * 1000)}
          >
            + 5s
          </Button>
          <Button mode="contained" onPress={() => video.current.playFromPositionAsync(0)}>
            Replay
          </Button>
        </View>

        <View style={styles.buttons}>
          <Button mode="contained" onPress={downloadVideo}>
            Download
          </Button>
        </View>
      </View>

      <Modal
        visible={downloadProgress > 0 && downloadProgress < 1}
        contentContainerStyle={{
          backgroundColor: 'white',
          padding: 20,
        }}
      >
        <Text style={styles.modalTitle}>
          Download Video ({Math.floor(downloadProgress * 100)}%)
        </Text>
        <Text style={styles.modalSubTitle}>
          please wait until download finish, do not close the app
        </Text>
        <ProgressBar progress={downloadProgress} />
      </Modal>
    </>
  )
}

VideoContainer.propTypes = {
  url: PropTypes.string.isRequired,
}

export default VideoContainer
