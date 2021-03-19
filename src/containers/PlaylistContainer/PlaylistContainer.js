import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FlatList, View } from 'react-native'
import { ListItem } from 'react-native-elements'
import { TouchableNativeFeedback } from 'react-native-gesture-handler'
import { getVideosByPlaylist } from '../../api/playlists'
import { STACK_SCREENS } from '../CTNavigationContainer/index'

const PlaylistContainer = ({ navigation, playlistId }) => {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    const fetchVideos = async () => {
       let response = await getVideosByPlaylist(playlistId)
       if (!response) return
       let videos = response.medias.sort((a, b) => a.index - b.index)
       setVideos(videos)
    }

    fetchVideos()
  }, [playlistId, setVideos])

  const onVideoSelected = (videoData) => {
      const urlExtension = videoData?.video?.video1Path
      if (!urlExtension)
        return

    //navigation.push(STACK_SCREENS.VIDEOS, {videoId: videoId})
  }

  const renderItem = ({ item }) => {
    return (
      <TouchableNativeFeedback
        onPress={() => onVideoSelected(item)}>
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
}

export default PlaylistContainer
