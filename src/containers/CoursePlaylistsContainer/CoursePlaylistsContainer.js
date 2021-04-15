import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FlatList, View } from 'react-native'
import { ListItem } from 'react-native-elements'
import { TouchableNativeFeedback } from 'react-native-gesture-handler'
import { getPlaylistsByOffering } from '../../api/playlists'
import { STACK_SCREENS } from '../CTNavigationContainer/index'
import { useLoadingIndicator } from '../../hooks/useLoadingIndicator'

const CoursePlaylistsContainer = ({ courseId, navigation }) => {
  const [playlists, setPlaylists] = useState([])
  const setLoading = useLoadingIndicator()

  useEffect(() => {
    const fetchPlaylists = async () => {
      setLoading(true)
      let response = await getPlaylistsByOffering(courseId)
      if (response) {
        response = response.sort((a, b) => a.index - b.index)
        setPlaylists(response)
      }

      setLoading(false)
    }

    fetchPlaylists()
    return () => setLoading(false)
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
