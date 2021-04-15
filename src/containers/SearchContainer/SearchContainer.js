import React, { useState, useEffect } from 'react'
import { TouchableNativeFeedback, FlatList, View, TextInput, Text } from 'react-native'
import { getOfferingsData, getStarredOfferings } from '../../api/offerings'
import { getCurrentAuthenticatedUser } from '../../api/auth'
import CourseCard from '../../components/Cards/CourseCard'
import styles from './SearchContainer.style'

export default SearchContainer = () => {
  const currentUser = getCurrentAuthenticatedUser()
  const [currentQuery, setCurrentQuery] = useState("")

  /**
   * Helper function to filter courses by the current query
   * @param offerings Pass in all offerings that student is allowed to access
   */
  const filterCourses = (offerings) => {
    const newOfferings = []
    return offerings
  }

  const [courses, setCourses] = useState([])
  useEffect(() => {
    const fetchCourseInfo = async () => {
      const offerings = await getOfferingsData()
      const studentCourses = filterCourses(offerings)
      setCourses(studentCourses)
    }
    fetchCourseInfo()
  }, [setCourses])

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
      <View key={courseId}>
        <TouchableNativeFeedback onPress={() => onCourseSelected(courseId)}>
          <View style={styles.cardContainer}>
            <CourseCard
              offeringId={courseId}
              departmentAcronym={course.departmentAcronym}
              courseNumber={course.courseNumber}
              courseName={courseName}
              courseDescription={courseDescription}
              isCourseStarred={isStarred}
            />
          </View>
        </TouchableNativeFeedback>
      </View>
    )
  }

  const renderSearchBar = () => {
    return (
        <View>
            <Text>Hello Test Test</Text>
            <TextInput />
        </View>
    )
  }

  /**
   * Renders all of the users' courses into a FlatList
   */
  const renderStarredCourses = () => {
    if (courses == null) return null

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
    <View>
        {renderSearchBar()}
        <View style={styles.viewStyle}>
            {renderStarredCourses()}
        </View>
    </View>
  )
}