/* eslint no-shadow: ["error", { "allow": ["status"] }] */
/* eslint-env es6 */
import React from 'react'
import { View, Button } from 'react-native'
import { Video } from 'expo-av'
import styles from './VideoContainer.style'

export default function VideoContainer() {
  const video = React.useRef(null)
  const [status, setStatus] = React.useState({})
  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        }}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
      <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? 'Pause' : 'Play'}
          onPress={() =>
            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
          }
        />
      </View>
    </View>
  )
}
