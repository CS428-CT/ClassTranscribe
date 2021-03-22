/* eslint no-shadow: ["error", { "allow": ["status"] }] */
/* eslint-env es6 */
import React from 'react'
import { View, Button } from 'react-native'
import { Video } from 'expo-av'
import PropTypes from 'prop-types'
import styles from './VideoContainer.style'

const VideoContainer = ({url}) => {
  const video = React.useRef(null)
  const [status, setStatus] = React.useState({})

  return (
    <View style={styles.container}>
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
          title={status.isPlaying ? 'Pause' : 'Play'}
          onPress={() =>
            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
          }
        />
      </View>
    </View>
  )
}

VideoContainer.propTypes = {
  url: PropTypes.string.isRequired,
}

export default VideoContainer
