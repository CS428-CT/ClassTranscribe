import React, { useState, useEffect } from 'react'
import { TouchableNativeFeedback, FlatList, View, Text } from 'react-native'
import PropTypes from 'prop-types'
import { getStarredOfferingsData, getStarredOfferings } from '../../api/offerings'
import { getCurrentAuthenticatedUser } from '../../api/auth'
import CourseCard from '../../components/Cards/CourseCard'
import { STACK_SCREENS } from '../CTNavigationContainer/index'
import styles from './Home.style'
import { useLoadingWrap } from '../../hooks/useLoadingWrap'
import { NO_STARRED_COURSES } from '../../constants'

/**
 * Contains the home screen of the application. Lists courses and gives the user the ability
 * to search for courses. Clicking on a course shows the playlists for it.
 */
const Home = ({ navigation }) => {
  const currentUser = getCurrentAuthenticatedUser()
  const loadingWrap = useLoadingWrap()
  let universityId = currentUser.universityId
  let departmentId = 'all'

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

  const onCourseSelected = (courseId) => {
    navigation.push(STACK_SCREENS.COURSE_PLAYLISTS, { courseId })
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
   * Renders all of the users' courses into a FlatList
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
      {renderCourses()}
    </View>
  )
}

Home.propTypes = {
  navigation: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}

export default Home