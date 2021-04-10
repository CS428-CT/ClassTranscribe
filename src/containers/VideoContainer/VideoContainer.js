/* eslint no-shadow: ["error", { "allow": ["status"] }] */
/* eslint-env es6 */
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { Button, Title } from 'react-native-paper'
import { Video } from 'expo-av'
import PropTypes from 'prop-types'
import RNPickerSelect from 'react-native-picker-select'
import * as FileSystem from 'expo-file-system'
import { FILE_SERVER_BASE_URL } from '../../constants'
import styles from './VideoContainer.style'
import { getCurrentAuthenticatedUser } from '../../api/auth'

// CT requires this header as an addititonal security measure. Since we're not an approved referer, we can actually
// just hardcode a valid referer and the API accepts it.
const REFERER = 'https://classtranscribe.illinois.edu/video?id=5ce157b0-713a-4182-94e9-065f68f9abf6'

const VideoContainer = ({ videos, index, downloaded }) => {
  // Passing a list of videos would not be a bad approach because react pass object as reference
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
          <Button icon="cloud-download" mode="contained">
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
          <RNPickerSelect
            style={{
              height: '100%',
              inputIOS: {
                height: '100%',
                padding: 0,
                margin: 0,
                borderWidth: 1,
                color: 'white',
                alignSelf: 'center',
                alignContent: 'center',
                alignItems: 'center',
              },
              inputAndroid: {
                height: '100%',
                color: 'white',
              },
            }}
            placeholder={{}} // disable empty selector
            value={status.rate}
            onValueChange={(value) => {
              videoRef.current.setRateAsync(value, true)
            }}
            items={[
              { label: '0.5 x', value: 0.5 },
              { label: '0.75 x', value: 0.75 },
              { label: '1.0 x', value: 1.0 },
              { label: '1.25 x', value: 1.25 },
              { label: '1.5 x', value: 1.5 },
              { label: '2.0 x', value: 2.0 },
            ]}
          >
            <Text
              style={{
                color: 'white',
                alignSelf: 'center',
                textAlign: 'center',
                fontSize: 20,
              }}
            >
              {status.rate ? `${status.rate} x` : '1 x'}
            </Text>
          </RNPickerSelect>
        </View>
      </View>

      {ready === true ? <></> : <ActivityIndicator style={styles.videoLoading} size="large" />}

      <View style={styles.buttons}>{downloadButton()}</View>

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
