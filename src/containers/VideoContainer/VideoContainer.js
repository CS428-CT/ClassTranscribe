/* eslint no-shadow: ["error", { "allow": ["status"] }] */
/* eslint-env es6 */
import React from 'react'
import { View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { Video } from 'expo-av'
import PropTypes from 'prop-types'
import styles from './VideoContainer.style'
import { getCurrentAuthenticatedUser } from '../../api/auth'

// CT requires this header as an addititonal security measure. Since we're not an approved referer, we can actually
// just hardcode a valid referer and the API accepts it.
const REFERER = "https://classtranscribe-dev.ncsa.illinois.edu/video?id=c79700ac-c3fc-439f-95c2-0511a1092862";

const VideoContainer = ({ url }) => {
  const video = React.useRef(null)
  const [status, setStatus] = React.useState({
    isMuted: false,
    isPlaying: false,
    rate: 1.0,
  })

  const videoSource = {
    uri: url,
    headers: { "referer": REFERER}
  }

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
  url: PropTypes.string.isRequired,
}

export default VideoContainer
