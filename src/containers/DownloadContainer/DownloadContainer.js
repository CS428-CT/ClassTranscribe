import React, { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import PropTypes from 'prop-types'
import * as FileSystem from 'expo-file-system'
import { Icon, Image, ListItem } from 'react-native-elements'
import * as VideoThumbnails from 'expo-video-thumbnails'
import { STACK_SCREENS } from '../CTNavigationContainer/index'

const videoSuffix = '.mp4' // Currently, classtrascribe only uses mp4 as their video format

/**
 * Contains the home screen of the application. Lists starred courses and gives the user the ability
 * to search for courses. Clicking on a course shows the playlists for it.
 * @param {Object} navigation A stack navigator that contains a video screen
 */
const DownloadContainer = ({ navigation }) => {
  const [localVideos, setLocalVideos] = useState([]) // an array of local video names

  const getFileSize = async (fileUri) => {
    const fileInfo = await FileSystem.getInfoAsync(fileUri)
    return (fileInfo.size / (1024 * 1024)).toFixed(2) // transform from bytes to MBs
  }

  const generateThumbnail = async (videoPath) => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(videoPath, {
        time: 15000,
      })
      return uri
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(e)
      return null
    }
  }

  useEffect(() => {
    const fetchLocalFiles = async () => {
      let files = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory)
      files = files.filter((fileName) => fileName.endsWith(videoSuffix))
      const videoItems = await Promise.all(
        files.map(async (fileName) => {
          const localUri = FileSystem.documentDirectory + fileName
          const thumbnail = await generateThumbnail(localUri)
          const filesize = await getFileSize(localUri)
          const videoName = fileName.slice(0, -videoSuffix.length) // filename without suffix
          return {
            key: videoName,
            name: videoName,
            thumbnailImg: thumbnail,
            filesize,
            video: {
              video1Path: fileName,
            },
          }
        })
      )
      // only update videoItems when videos changes
      if (JSON.stringify(localVideos) !== JSON.stringify(videoItems)) {
        setLocalVideos(videoItems)
      }
    }

    fetchLocalFiles()
    const interval = setInterval(() => {
      fetchLocalFiles()
    }, 5000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  const watchVideo = (videoItem) => {
    const param = {
      videos: [videoItem],
      index: 0,
      downloaded: true,
    }
    navigation.push(STACK_SCREENS.VIDEO, param)
  }

  const deleteVideo = (videoItem) => {
    const localUri = FileSystem.documentDirectory + videoItem.video.video1Path
    FileSystem.deleteAsync(localUri).then(() =>
      // eslint-disable-next-line no-console
      console.log('Deleted', localUri)
    )
    setLocalVideos(localVideos.filter((item) => item !== videoItem))
  }

  const renderVideoItem = ({ item }) => {
    return (
      <ListItem key={item.video.name} bottomDivider>
        <Icon name="play-circle-outline" size={36} onPress={() => watchVideo(item)} />
        <ListItem.Content>
          <ListItem.Title accessibilityRole="button">{item.name}</ListItem.Title>
          <ListItem.Subtitle>{`${item.filesize} MB`}</ListItem.Subtitle>
          {item.thumbnailImg !== null ? (
            <Image
              source={{ uri: item.thumbnailImg }}
              style={{ marginTop: 10, height: 200 * 0.5625, width: 200 }}
            />
          ) : (
            <></>
          )}
        </ListItem.Content>
        <Icon name="delete" size={36} onPress={() => deleteVideo(item)} />
      </ListItem>
    )
  }

  return (
    <View>
      <FlatList data={localVideos} renderItem={renderVideoItem} />
    </View>
  )
}

DownloadContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  }).isRequired,
}

export default DownloadContainer
