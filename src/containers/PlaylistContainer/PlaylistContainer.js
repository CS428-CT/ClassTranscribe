import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FlatList, View } from 'react-native'
import { ListItem } from 'react-native-elements'
import { TouchableNativeFeedback } from 'react-native-gesture-handler'
import { getVideosByPlaylist } from '../../api/playlists'
import { STACK_SCREENS } from '../CTNavigationContainer/index'
import { useLoadingWrap } from '../../hooks/useLoadingWrap'

const PlaylistContainer = ({ navigation, playlistId }) => {
  const [videos, setVideos] = useState([])
  const loadingWrap = useLoadingWrap()

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await getVideosByPlaylist(playlistId)
      if (response) {
        const sortedVideos = response.medias.sort((a, b) => a.index - b.index)

        // Get rid of undefined indices
        for (let i = 0; i < sortedVideos.length; i += 1) sortedVideos[i].index = i

        setVideos(sortedVideos)
      }
    }

    return loadingWrap(fetchVideos)
  }, [playlistId, setVideos])

  const onVideoSelected = (videoData) => {
    const urlExtension = videoData?.video?.video1Path
    if (!urlExtension) return
    const param = {
      videos,
      index: videoData.index,
    }
    navigation.push(STACK_SCREENS.VIDEO, param)
  }

  const renderItem = ({ item }) => {
    return (
      <TouchableNativeFeedback key={item.id} onPress={() => onVideoSelected(item)}>
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
