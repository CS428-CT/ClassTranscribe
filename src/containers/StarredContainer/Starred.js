import React, { useState, useEffect } from 'react'
import { TouchableNativeFeedback, FlatList, View, Text } from 'react-native'
import PropTypes from 'prop-types'
import { getUserHistory } from '../../api/history'
import { getMedia } from '../../api/video'
// import { getCurrentAuthenticatedUser } from '../../api/auth'
import VideoCard from '../../components/Cards/VideoCard'
import { STACK_SCREENS } from '../CTNavigationContainer/index'
import styles from './Starred.style'
import { useLoadingWrap } from '../../hooks/useLoadingWrap'
import { NO_HISTORY } from '../../constants'

/**
 * Contains the home screen of the application. Lists courses and gives the user the ability
 * to search for courses. Clicking on a course shows the playlists for it.
 * @param {Object} navigation Stack navigator
 */
const Starred = ({ navigation }) => {
  // const currentUser = getCurrentAuthenticatedUser()
  const loadingWrap = useLoadingWrap()

  const [history, setHistory] = useState([])
  useEffect(() => {
    const fetchHistoryInfo = async () => {
      let res
      res = await getUserHistory()
      if (res.length === 1) {
        res = res[0]
      }
      setHistory(res)
    }

    return loadingWrap(fetchHistoryInfo, 'fetchHistory')
  }, [setHistory])

  /**
   * Helper function to fetch and navigate to pressed video
   * @param {*} item
   */
  const onHistorySelected = async (item) => {
    const videos = await getMedia(item.watchHistory)
    const param = {
      videos: [videos],
      index: 0,
      downloaded: false,
    }
    navigation.push(STACK_SCREENS.VIDEO, param)
  }

  /**
   * Renders a single watch history in the history list.
   * @param {Object} item The underlying data for the item to render.
   */
  const renderHistoryItem = ({ item }) => {
    if (item.length === 0) return null

    return (
      <View accessibilityRole="button" key={item.id}>
        <TouchableNativeFeedback accessibilityRole="button" onPress={() => onHistorySelected(item)}>
          <View accessibilityRole="button" style={styles.cardContainer}>
            <VideoCard name={item.name} ratio={item.watchHistory.json.ratio.toFixed(2)} />
          </View>
        </TouchableNativeFeedback>
      </View>
    )
  }

  /**
   * Renders all of the users' Watched Video  into a FlatList
   */
  const renderWatchVideos = () => {
    if (history.length === 0) {
      return (
        <Text testID="historyList" style={styles.noCourses}>
          {NO_HISTORY}
        </Text>
      )
    }

    return (
      <FlatList
        testID="historyList"
        keyExtractor={(idxCourses, index) => index.toString()}
        data={history}
        renderItem={renderHistoryItem}
      />
    )
  }

  return <View style={styles.viewStyle}>{renderWatchVideos()}</View>
}

Starred.propTypes = {
  navigation: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}

export default Starred
