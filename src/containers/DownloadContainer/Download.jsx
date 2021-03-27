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
const Download = ({ navigation }) => {
  const [localVideos, setLocalVideos] = useState([]) // an array of local video names

  const fetchLocalFiles = async () => {
    await FileSystem.readDirectoryAsync(FileSystem.documentDirectory).then((files) => {
      setLocalVideos(files.filter((fileName) => fileName.endsWith('.mp4')))
    })
  }

  useEffect(() => {
    fetchLocalFiles()
    const interval = setInterval(() => {
      fetchLocalFiles()
    }, 1000)
    return () => clearInterval(interval)
  }, [setLocalVideos])

  const onVideoSelected = (videoName) => {
    navigation.navigate(STACK_SCREENS.VIDEO, { url: FileSystem.documentDirectory + videoName })
  }

  const renderVideoItem = ({ item }) => {
    return (
      <TouchableNativeFeedback useForeground onPress={() => onVideoSelected(item)}>
        <ListItem key={item} bottomDivider>
          <ListItem.Content>
            <ListItem.Title accessibilityRole="button">{item}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </TouchableNativeFeedback>
    )
  }

  return (
    <View style={{ marginTop: 80 }}>
      <FlatList data={localVideos} renderItem={renderVideoItem} />
    </View>
  )
}

Download.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

export default Download
