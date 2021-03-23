/* eslint no-shadow: ["error", { "allow": ["status"] }] */
/* eslint-env es6 */
import React from 'react'
import { View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import { Video } from 'expo-av'
import PropTypes from 'prop-types'
import { Asset } from 'expo-asset';
import styles from './VideoContainer.style'

const VideoContainer = ({ url }) => {
  const video = React.useRef(null)
  const [status, setStatus] = React.useState({
    isMuted: false,
    isPlaying: false,
    rate: 1.0,
  })

  // const [videoURI, setVideoURI] = React.useState(

  //   // 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'
  // )

  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <TextInput label="Video URI" value={url} onChangeText={(text) => setVideoURI(text)} />
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

        <Button mode="contained" onPress={() => video.current.loadAsync('/storage/emulated/0/Download')}>
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
