import React, { useEffect, useState } from 'react'
import RNPickerSelect from 'react-native-picker-select'
import { Text, View } from 'react-native'
import { TouchableNativeFeedback } from 'react-native-gesture-handler'
import PropTypes from 'prop-types'
import { getPlaylistsByOffering, getVideosByPlaylist } from '../../api/playlists'
import { STACK_SCREENS } from '../../containers/CTNavigationContainer/index'
import { FILE_SERVER_BASE_URL } from '../../constants'
import styles from './Recommend.style'

/**
 * Class for recccomend video of corresbonding course
 * @param {Object} navigation navigation ovject for CTNavigator
 * @param {string} courseId courseId used for reccomend video
 * @param {boolean} mode mode for latestvideo, false mean progress tracking.
 * @returns
 */
const Recommend = ({ navigation, courseId, mode }) => {
  const [playlists, setPlaylists] = useState([])
  const [selected, setSelected] = useState(null)
  const [videos, setVideos] = useState(null)
  /**
   * Use Effect monitor playlist fetched
   */
  useEffect(() => {
    const fetchPlaylists = async () => {
      const response = await getPlaylistsByOffering(courseId)
      if (!response) return
      setPlaylists(response)
    }
    fetchPlaylists()
  }, [courseId, setPlaylists])

  /**
   * Use Effect monitor Selected playlist and fetched corresbonding video
   */
  useEffect(() => {
    const fetchVideos = async () => {
      const response = await getVideosByPlaylist(selected)
      if (!response) return
      const indexedVid = response.medias.sort((a, b) => a.index - b.index)
      setVideos(indexedVid)
    }
    if (selected) {
      fetchVideos()
    }
  }, [selected, setVideos])

  /**
   * Function to Render to playlist picker for reccomend video
   */
  const renderPicker = () => {
    const pickItems = playlists.map((item) => {
      return { label: item.name, value: item.id }
    })
    if (pickItems.length > 0) {
      if (selected == null) setSelected(pickItems[0].value)
      return (
        <View>
          <RNPickerSelect
            style={{ placeholder: { color: 'black' } }}
            placeholder={{
              label: pickItems[0].label,
              value: pickItems[0].value,
            }}
            onValueChange={(value) => {
              setSelected(value)
              setVideos(null)
            }}
            items={pickItems.slice(1)}
          />
        </View>
      )
    }
    return <View />
  }
  /**
   * Navigate function for video tab
   * @param {Object} rec video object of reccomend video
   * @returns None
   */
  const onVideoSelected = (rec) => {
    const urlExtension = rec?.video?.video1Path
    if (!urlExtension) return

    const url = FILE_SERVER_BASE_URL + urlExtension
    navigation.push(STACK_SCREENS.VIDEO, { url })
  }

  /**
   * Function to Render recommend video of given playlist
   */
  const renderVideo = () => {
    /**
     * Custom Enum for code clean
     */
    const status = {
      PROCESS: 0,
      NOVIDEO: 1,
      NORMAL: 2,
      FINISH: 3,
    }
    let stat = status.PROCESS
    let rec = null
    if (videos) {
      if (!videos.length) {
        stat = status.NOVIDEO
      } else if (mode) {
        rec = videos[videos.length - 1]
        if (rec.watchHistory) stat = status.FINISH
        else stat = status.NORMAL
      } else {
        for (let i = videos.length - 1; i >= 0; i -= 1) {
          if (videos[i].watchHistory) {
            if (i === videos.length - 1) {
              stat = status.FINISH
            } else {
              rec = videos[i + 1]
              stat = status.NORMAL
            }
            break
          }
        }
        if (stat === status.PROCESS) {
          rec = videos[0]
          stat = status.NORMAL
        }
      }
    }

    /** Rendering part * */
    switch (stat) {
      case status.PROCESS:
        return (
          <View>
            <Text>Placeholder for waiting</Text>
          </View>
        )
      case status.NOVIDEO:
        return (
          <View>
            <Text>Placeholder for no Video</Text>
          </View>
        )
      case status.FINISH:
        return (
          <View>
            <Text>Placeholder for Finish</Text>
          </View>
        )
      case status.NORMAL:
        return (
          <TouchableNativeFeedback onPress={() => onVideoSelected(rec)}>
            <View>
              <Text>{rec.name}</Text>
            </View>
          </TouchableNativeFeedback>
        )
      default:
        return <Text>ERR: Unexpected case occur</Text>
    }
  }

  return (
    <View style={styles.container}>
      <Text>Active Playlist</Text>
      {renderPicker()}
      {renderVideo()}
    </View>
  )
}

Recommend.propTypes = {
  navigation: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  courseId: PropTypes.string.isRequired,
  mode: PropTypes.bool.isRequired,
}

export default Recommend
