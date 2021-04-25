import React, { useState, useEffect } from 'react'
import { TouchableNativeFeedback, FlatList, View, Text } from 'react-native'
import PropTypes from 'prop-types'
import { getStarredOfferings, getStarredOfferingsData } from '../../api/offerings'
import { getUserHistory } from '../../api/history'
import { getMedia } from '../../api/video'
import { getCurrentAuthenticatedUser } from '../../api/auth'
import CourseCard from '../../components/Cards/CourseCard'
import VideoCard from '../../components/Cards/VideoCard'
import { STACK_SCREENS } from '../CTNavigationContainer/index'
import styles from './Starred.style'
import { useLoadingWrap } from '../../hooks/useLoadingWrap'
import { NO_STARRED_COURSES, NO_HISTORY } from '../../constants'

/**
 * Contains the home screen of the application. Lists courses and gives the user the ability
 * to search for courses. Clicking on a course shows the playlists for it.
 */
const Starred = ({ navigation }) => {
  const currentUser = getCurrentAuthenticatedUser()
  const loadingWrap = useLoadingWrap()
  const universityId = currentUser.universityId
  const departmentId = 'all'

  /**
   * Helper function to filter courses by university id
   * @param offerings Pass in all offerings that student is allowed to access only
   */
  const filterCourses = (offerings) => {
    const newOfferings = []
    for (const i in offerings) {
      if (offerings[i].term.universityId === universityId) {
        if (departmentId === 'all' || offerings[i].courses[0].departmentId === departmentId) {
          newOfferings.push(offerings[i])
        }
      }
    }

    return newOfferings
  }

  const [courses, setCourses] = useState([])
  useEffect(() => {
    const fetchCourseInfo = async () => {
      let offerings
      offerings = await getStarredOfferingsData()
      if (offerings.length === 1) {
        offerings = offerings[0]
      }

      const studentCourses = filterCourses(offerings)
      setCourses(studentCourses)
    }

    return loadingWrap(fetchCourseInfo, 'fetchCourses')
  }, [setCourses])

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
  }, [setCourses])

  const onCourseSelected = (courseId) => {
    navigation.push(STACK_SCREENS.COURSE_PLAYLISTS, { courseId })
  }

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
   * Renders a single course in the course list.
   * @param {Object} item The underlying data for the item to render.
   */
  const renderCourseItem = ({ item }) => {
    if (item.length === 0) return null

    const course = item.courses[0]
    const { courseName } = item.offering
    const courseDescription = item.offering.description
    const courseId = item.offering.id
    const isStarred = courseId in getStarredOfferings()

    return (
      <View accessibilityRole="button" key={courseId}>
        <TouchableNativeFeedback
          accessibilityRole="button"
          onPress={() => onCourseSelected(courseId)}
        >
          <View accessibilityRole="button" style={styles.cardContainer}>
            <CourseCard
              offeringId={courseId}
              departmentAcronym={course.departmentAcronym}
              courseNumber={course.courseNumber}
              courseName={courseName}
              courseSection={item.offering.sectionName}
              courseTerm={item.term.name}
              courseDescription={courseDescription}
              isCourseStarred={isStarred}
              accessibilityRole="button"
            />
          </View>
        </TouchableNativeFeedback>
      </View>
    )
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
        data={history.slice(5)}
        renderItem={renderHistoryItem}
      />
    )
  }

  /**
   * Renders all of the users' Courses into a FlatList
   */
  const renderCourses = () => {
    if (courses.length === 0) {
      return (
        <Text testID="courseList" style={styles.noCourses}>
          {NO_STARRED_COURSES}
        </Text>
      )
    }
    return (
      <FlatList
        testID="courseList"
        keyExtractor={(idxCourses, index) => index.toString()}
        data={courses}
        renderItem={renderCourseItem}
      />
    )
  }

  return (
    <View style={styles.viewStyle}>
      {renderWatchVideos()}
      {renderCourses()}
    </View>
  )
}

Starred.propTypes = {
  navigation: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}

export default Starred
