/* eslint no-shadow: ["error", { "allow": ["status"] }] */
/* eslint-env es6 */
import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { Video } from 'expo-av'
import PropTypes from 'prop-types'
import { FILE_SERVER_BASE_URL } from '../../constants'
import styles from './VideoContainer.style'
import { getCurrentAuthenticatedUser } from '../../api/auth'

// CT requires this header as an addititonal security measure. Since we're not an approved referer, we can actually
// just hardcode a valid referer and the API accepts it.
const REFERER = 'https://classtranscribe.illinois.edu/video?id=5ce157b0-713a-4182-94e9-065f68f9abf6'

const VideoContainer = ({ videos, index }) => {
  // Passing a list of videos would not be a bad approach because react pass object as reference
  const [vidIndex, setVidIndex] = useState(index)
  const url = videos[vidIndex]?.video?.video1Path
  const videoRef = React.useRef(null)

  const videoSource = {
    uri: FILE_SERVER_BASE_URL + url,
    headers: {
      referer: REFERER,
      authorization: `Bearer ${getCurrentAuthenticatedUser()?.authToken}`,
    },
  }

  const [status, setStatus] = React.useState({
    isMuted: false,
    isPlaying: false,
    rate: 1.0,
  })

  useEffect(() => {
    setStatus({
      isMuted: false,
      isPlaying: false,
      rate: 1.0,
    })
    videoRef.current.unloadAsync().then(() => {
      videoRef.current.loadAsync(
        videoSource,
        { positionMillis: (videos[vidIndex].watchHistory?.json?.timestamp || 0) * 1000 },
        true
      )
    })
  }, [vidIndex])

  const renderLinkVideo = () => {
    return (
      <View style={styles.buttons}>
        <Button
          mode="contained"
          disabled={vidIndex === 0}
          onPress={() => {
            setVidIndex(vidIndex - 1)
          }}
        >
          Previous Video
        </Button>
        <Button
          mode="contained"
          disabled={vidIndex + 1 >= videos.length}
          onPress={() => {
            setVidIndex(vidIndex + 1)
          }}
        >
          Next Video
        </Button>
      </View>
    )
  }
  // positionMillis={(videos[vidIndex].watchHistory?.json?.timestamp || 0) * 1000}
  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <Text label="Video URI" value={url} />
      </View>
      <Video
        ref={videoRef}
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
            status.isPlaying ? videoRef.current.pauseAsync() : videoRef.current.playAsync()
          }
        >
          {status.isPlaying ? 'Pause' : 'Play'}
        </Button>
        <Button mode="contained" onPress={() => videoRef.current.setIsMutedAsync(!status.isMuted)}>
          {status.isMuted ? 'Unmute' : 'Mute'}
        </Button>
      </View>

      <View style={styles.input}>
        <Button
          mode="contained"
          onPress={() => videoRef.current.setRateAsync(status.rate - 0.1, true)}
        >
          Decrease Rate
        </Button>
        <Text>Play Rate: {status.rate}</Text>
        <Button
          mode="contained"
          onPress={() => videoRef.current.setRateAsync(status.rate + 0.1, true)}
        >
          Increase Rate
        </Button>
      </View>

      <View style={styles.buttons}>
        <Button
          mode="contained"
          onPress={() => videoRef.current.setPositionAsync(status.positionMillis - 5 * 1000)}
        >
          - 5s
        </Button>
        <Button
          mode="contained"
          onPress={() => videoRef.current.setPositionAsync(status.positionMillis + 5 * 1000)}
        >
          + 5s
        </Button>
        <Button mode="contained" onPress={() => videoRef.current.playFromPositionAsync(0)}>
          Replay
        </Button>

        <Button
          mode="contained"
          onPress={() => videoRef.current.loadAsync('/storage/emulated/0/Download')}
        >
          Download
        </Button>
      </View>
      {renderLinkVideo()}
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
        json: PropTypes.shape({
          timestamp: PropTypes.number,
        }),
      }),
    }).isRequired
  ).isRequired,
  index: PropTypes.number.isRequired,
}

export default VideoContainer
