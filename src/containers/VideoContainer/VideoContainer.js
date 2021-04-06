/* eslint no-shadow: ["error", { "allow": ["status"] }] */
/* eslint-env es6 */
import React, { useEffect } from 'react'
import { View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { Video } from 'expo-av'
import PropTypes from 'prop-types'
import { FILE_SERVER_BASE_URL } from '../../constants'
import styles from './VideoContainer.style'

// CT requires this header as an addititonal security measure. Since we're not an approved referer, we can actually
// just hardcode a valid referer and the API accepts it.
const REFERER =
  'https://classtranscribe-dev.ncsa.illinois.edu/video?id=c79700ac-c3fc-439f-95c2-0511a1092862'

const VideoContainer = ({ videos, index }) => {
  // Passing a list of videos would not be a bad approach because react pass object as reference
  const url = videos[index].video.video1Path
  const video = React.useRef(null)
  const initPos = videos[index].watchHistory?.timestrap || 0
  const [status, setStatus] = React.useState({
    isMuted: false,
    isPlaying: false,
    rate: 1.0,
  })

  const videoSource = {
    uri: FILE_SERVER_BASE_URL + url,
    headers: { referer: REFERER },
  }

  /**
   * Only for debugging
   */
  useEffect(() => {
    // console.log(videos[index])
  })

  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <Text label="Video URI" value={url} />
      </View>
      <Video
        ref={video}
        style={styles.video}
        source={videoSource}
        useNativeControls
        resizeMode="contain"
        positionMillis={initPos * 1000}
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

        <Button
          mode="contained"
          onPress={() => video.current.loadAsync('/storage/emulated/0/Download')}
        >
          Download
        </Button>
      </View>
    </View>
  )
}

VideoContainer.propTypes = {
  videos: PropTypes.arrayOf(
    PropTypes.shape({
      video: PropTypes.shape({
        video1Path: PropTypes.string.isRequired,
      }).isRequired,
      watchHistory: PropTypes.shape({
        timestrap: PropTypes.number,
      }),
    }).isRequired
  ).isRequired,
  index: PropTypes.number.isRequired,
}

export default VideoContainer
