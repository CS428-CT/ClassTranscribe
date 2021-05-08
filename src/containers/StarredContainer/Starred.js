import React, { useState, useEffect } from 'react'
import { TouchableNativeFeedback, FlatList, View, Text } from 'react-native'
import PropTypes from 'prop-types'
import { getStarredOfferingsData, getStarredOfferings } from '../../api/offerings'
import CourseCard from '../../components/Cards/CourseCard'
import { STACK_SCREENS } from '../CTNavigationContainer/index'
import styles from './Starred.style'
import { useLoadingWrap } from '../../hooks/useLoadingWrap'
import { NO_STARRED_COURSES } from '../../constants'

/**
 * Contains the starred screen of the application. Lists courses and gives the user the ability
 * to search for courses. Clicking on a course shows othe playlists for it.
 * @param {Object} navigation A stack navigator
 */
const Starred = ({ navigation }) => {
  const loadingWrap = useLoadingWrap()
  const [courses, setCourses] = useState([])

  useEffect(() => {
    const fetchCourseInfo = async () => {
      const offerings = await getStarredOfferingsData()
      setCourses(offerings)
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
    if (item.courses.length === 0) return null

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
              courseSection={item?.offering?.sectionName}
              courseTerm={item?.term?.name}
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
    if (!courses?.length) {
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

  return <View style={styles.viewStyle}>{renderCourses()}</View>
}

Starred.propTypes = {
  navigation: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}

export default Starred
