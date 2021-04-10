import React, { useEffect, useState } from 'react'
import { FlatList, TouchableNativeFeedback, View } from 'react-native'
import PropTypes from 'prop-types'
import * as FileSystem from 'expo-file-system'
import { ListItem } from 'react-native-elements'
import { STACK_SCREENS } from '../CTNavigationContainer/index'

/**
 * Contains the home screen of the application. Lists starred courses and gives the user the ability
 * to search for courses. Clicking on a course shows the playlists for it.
 */
const DownloadContainer = ({ navigation }) => {
  const [localVideos, setLocalVideos] = useState([]) // an array of local video names

  const fetchLocalFiles = async () => {
    await FileSystem.readDirectoryAsync(FileSystem.documentDirectory).then((files) => {
      setLocalVideos(
        files
          .filter((fileName) => fileName.endsWith('.mp4'))
          .map((fileName) => {
            return {
              name: fileName.slice(0, -4),
              video: {
                video1Path: fileName,
              },
            }
          })
      )
    })
  }

  useEffect(() => {
    fetchLocalFiles()
    const interval = setInterval(() => {
      fetchLocalFiles()
    }, 1000)
    return () => clearInterval(interval)
  }, [setLocalVideos])

  const onVideoSelected = (videoItem) => {
    const param = {
      videos: [videoItem],
      index: 0,
      downloaded: true,
    }
    navigation.push(STACK_SCREENS.VIDEO, param)
  }

  const renderVideoItem = ({ item }) => {
    return (
      <TouchableNativeFeedback useForeground onPress={() => onVideoSelected(item)}>
        <ListItem key={item.video.name} bottomDivider>
          <ListItem.Content>
            <ListItem.Title accessibilityRole="button">{item.name}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </TouchableNativeFeedback>
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
