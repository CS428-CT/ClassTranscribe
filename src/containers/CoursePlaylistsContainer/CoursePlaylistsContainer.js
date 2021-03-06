import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FlatList, View } from 'react-native'
import { ListItem } from 'react-native-elements'
import { TouchableNativeFeedback } from 'react-native-gesture-handler'
import { getPlaylistsByOffering } from '../../api/playlists'
import { STACK_SCREENS } from '../CTNavigationContainer/index'
import { useLoadingWrap } from '../../hooks/useLoadingWrap'

/**
 * Renders all playlists for a given course
 * @param {String} courseId The offering ID of the course to render
 * @param {Object} navigation The stack navigator object to be used. This allows the screen to launch other screens when a playlist is clicked.
 */
const CoursePlaylistsContainer = ({ courseId, navigation }) => {
  const [playlists, setPlaylists] = useState([])
  const loadingWrap = useLoadingWrap()

  useEffect(() => {
    const fetchPlaylists = async () => {
      let response = await getPlaylistsByOffering(courseId)
      if (response) {
        response = response.sort((a, b) => a.index - b.index)
        setPlaylists(response)
      }
    }

    return loadingWrap(fetchPlaylists, 'fetchPlaylists')
  }, [courseId, setPlaylists])

  const onPlaylistSelected = (playlistId) => {
    navigation.push(STACK_SCREENS.PLAYLIST, { playlistId })
  }

  const renderItem = ({ item }) => {
    return (
      <TouchableNativeFeedback key={item.id} onPress={() => onPlaylistSelected(item.id)}>
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title accessibilityRole="button">{item.name}</ListItem.Title>
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
  navigation: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}

export default CoursePlaylistsContainer
