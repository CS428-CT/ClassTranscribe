import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FlatList, View } from 'react-native'
import { ListItem } from 'react-native-elements'
import { TouchableNativeFeedback } from 'react-native-gesture-handler'
import { getVideosByPlaylist } from '../../api/playlists'
import { STACK_SCREENS } from '../CTNavigationContainer/index'
import { FILE_SERVER_BASE_URL } from '../../constants'

const PlaylistContainer = ({ navigation, playlistId }) => {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await getVideosByPlaylist(playlistId)
      if (!response) return
      const sortedVideos = response.medias.sort((a, b) => a.index - b.index)
      setVideos(sortedVideos)
    }

    fetchVideos()
  }, [playlistId, setVideos])

  const onVideoSelected = (videoData) => {
    const urlExtension = videoData?.video?.video1Path
    if (!urlExtension) return

    const url = FILE_SERVER_BASE_URL + urlExtension
    navigation.push(STACK_SCREENS.VIDEO, { url })
  }

  const renderItem = ({ item }) => {
    return (
      <TouchableNativeFeedback onPress={() => onVideoSelected(item)}>
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
      <FlatList data={videos} renderItem={renderItem} />
    </View>
  )
}

PlaylistContainer.propTypes = {
  playlistId: PropTypes.string.isRequired,
  navigation: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}

export default PlaylistContainer
