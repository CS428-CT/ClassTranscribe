import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FlatList, View } from 'react-native'
import { ListItem } from 'react-native-elements'
import { TouchableNativeFeedback } from 'react-native-gesture-handler'
import { getPlaylistsByOffering } from '../../api/playlists'
import { STACK_SCREENS } from '../CTNavigationContainer/index'
import styles from './CoursePlaylistsContainer.style'

const CoursePlaylistsContainer = ({ courseId, navigation }) => {
  const [playlists, setPlaylists] = useState([])

  useEffect(() => {
    const fetchPlaylists = async () => {
      let response = await getPlaylistsByOffering(courseId)
      if (!response) return
      response = response.sort((a, b) => a.index - b.index)
      setPlaylists(response)
    }

    fetchPlaylists()
  }, [courseId, setPlaylists])

  const onPlaylistSelected = (playlistId) => {
    navigation.push(STACK_SCREENS.PLAYLIST, { playlistId })
  }

  const renderItem = ({ item }) => {
    return (
      <TouchableNativeFeedback onPress={() => onPlaylistSelected(item.id)}>
        <ListItem key={item.id} bottomDivider>
          <ListItem.Content>
            <ListItem.Title>{item.name}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </TouchableNativeFeedback>
    )
  }

  return (
    <View>
      <FlatList data={playlists} renderItem={renderItem} />
    </View>
  )
}

CoursePlaylistsContainer.propTypes = {
  courseId: PropTypes.string.isRequired,
}

export default CoursePlaylistsContainer
