/* eslint no-shadow: ["error", { "allow": ["status"] }] */
/* eslint-env es6 */
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { Button, Title } from 'react-native-paper'
import { Video } from 'expo-av'
import PropTypes from 'prop-types'
import * as FileSystem from 'expo-file-system'
import { FILE_SERVER_BASE_URL } from '../../constants'
import styles from './VideoContainer.style'
import { getCurrentAuthenticatedUser } from '../../api/auth'

// CT requires this header as an addititonal security measure. Since we're not an approved referer, we can actually
// just hardcode a valid referer and the API accepts it.
const REFERER = 'https://classtranscribe.illinois.edu/video?id=5ce157b0-713a-4182-94e9-065f68f9abf6'

/**
 * Renders the screen where a user can view videos for a course
 * @param {Object} videos An array of video data for this playlist
 * @param {Number} index The current selected video index within the playlist
 * @param {Boolean} downloaded True if downloaded, false otherwise
 * @returns Children of component
 */
const VideoContainer = ({ videos, index, downloaded }) => {
  const [vidIndex, setVidIndex] = useState(index)
  const url = videos[vidIndex]?.video?.video1Path

  let videoSource
  if (!downloaded) {
    videoSource = {
      uri: FILE_SERVER_BASE_URL + url,
      headers: {
        referer: REFERER,
        authorization: `Bearer ${getCurrentAuthenticatedUser()?.authToken}`,
      },
    }
  } else {
    videoSource = {
      uri: FileSystem.documentDirectory + url,
    }
  }

  const videoRef = React.useRef(null)
  const [status, setStatus] = React.useState({
    isMuted: false,
    isPlaying: false,
    rate: 1.0,
    positionMillis: 0,
  })
  const [ready, setReady] = React.useState(false)

  const [downloadProgress, setDownloadProgress] = useState(0)

  const downloadVideo = async (downloadSource, localFileName) => {
    const localUri = FileSystem.documentDirectory + localFileName

    const callback = (currDownloadProgress) => {
      const progress =
        currDownloadProgress.totalBytesWritten / currDownloadProgress.totalBytesExpectedToWrite
      setDownloadProgress(progress)
    }

    const downloadResumable = FileSystem.createDownloadResumable(
      downloadSource,
      localUri,
      {
        headers: {
          referer: REFERER,
          authorization: `Bearer ${getCurrentAuthenticatedUser()?.authToken}`,
        },
      },
      callback
    )

    try {
      const { uri } = await downloadResumable.downloadAsync()
      // eslint-disable-next-line no-console
      console.log('Finished downloading to ', uri)
    } catch (e) {
      console.error(e)
    }
  }

  const downloadButton = () => {
    if (downloaded) {
      return <View />
    }
    if (downloadProgress === 0) {
      return (
        <View style={styles.buttons}>
          <Button
            icon="cloud-download"
            mode="contained"
            onPress={() => downloadVideo(videoSource.uri, `${videos[vidIndex].name}.mp4`)}
          >
            Download
          </Button>
        </View>
      )
    }
    if (downloadProgress > 0 && downloadProgress < 1) {
      return (
        <View style={styles.buttons}>
          <Button icon="cloud-download" loading mode="contained">
            Downloading ({Math.floor(downloadProgress * 100)}%)
          </Button>
        </View>
      )
    }
    return (
      <View style={styles.buttons}>
        <Button icon="cloud-download" mode="contained">
          Downloaded
        </Button>
      </View>
    )
  }

  useEffect(() => {
    setStatus({
      isMuted: false,
      isPlaying: false,
      rate: 1.0,
    })
    videoRef.current.unloadAsync().then(() => {
      setReady(false)
      videoRef.current
        .loadAsync(
          videoSource,
          { positionMillis: (videos[vidIndex].watchHistory?.json?.timestamp || 0) * 1000 },
          true
        )
        .then(() => {
          setReady(true)
        })
    })
  }, [vidIndex])

  const togglePlayPause = () =>
    status.isPlaying ? videoRef.current.pauseAsync() : videoRef.current.playAsync()

  const renderLinkVideo = () => {
    return (
      <View style={styles.buttons}>
        <Button
          icon="skip-previous"
          mode="contained"
          disabled={vidIndex === 0}
          onPress={() => {
            setVidIndex(vidIndex - 1)
          }}
        >
          Previous Video
        </Button>
        <Button
          icon="skip-next"
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

  return (
    <View style={styles.container}>
      <Title style={styles.title}>{videos[vidIndex].name}</Title>

      <View style={ready ? {} : { display: 'none' }}>
        <Video
          ref={videoRef}
          style={styles.video}
          source={videoSource}
          useNativeControls
          resizeMode="contain"
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => videoRef.current.playFromPositionAsync(0)}>
            <Icon name="replay" color="white" size={35} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => videoRef.current.setPositionAsync(status.positionMillis - 10 * 1000)}
          >
            <Icon name="replay-10" color="white" size={35} />
          </TouchableOpacity>
          <TouchableOpacity onPress={togglePlayPause}>
            {status.isPlaying ? (
              <Icon name="pause" color="white" size={35} />
            ) : (
              <Icon name="play-arrow" color="white" size={35} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => videoRef.current.setPositionAsync(status.positionMillis + 10 * 1000)}
          >
            <Icon name="forward-10" color="white" size={35} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => videoRef.current.setIsMutedAsync(!status.isMuted)}>
            {status.isMuted ? (
              <Icon name="volume-off" color="white" size={35} />
            ) : (
              <Icon name="volume-up" color="white" size={35} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.rateButton}
            onPress={() => {
              let newRate = status.rate + 0.25
              if (newRate > 2.0) {
                newRate = 0.5
              }
              videoRef.current.setRateAsync(newRate, true)
            }}
          >
            <Text style={styles.rateButtonText}>
              {status.rate ? `${status.rate.toFixed(2)} x` : '1 x'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {ready === true ? <></> : <ActivityIndicator style={styles.videoLoading} size="large" />}

      <View style={styles.buttons}>{downloadButton()}</View>

      {/* {renderLinkVideo()} */}
    </View>
  )
}

VideoContainer.propTypes = {
  videos: PropTypes.arrayOf(
    PropTypes.shape({
      video: PropTypes.shape({
        video1Path: PropTypes.string.isRequired,
      }).isRequired,
      name: PropTypes.string,
      watchHistory: PropTypes.shape({
        json: PropTypes.shape({
          timestamp: PropTypes.number,
        }),
      }),
    }).isRequired
  ).isRequired,
  index: PropTypes.number.isRequired,
  downloaded: PropTypes.bool,
}

export default VideoContainer
