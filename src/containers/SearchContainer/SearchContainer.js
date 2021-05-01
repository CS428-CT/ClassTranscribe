import React, { useState, useEffect } from 'react'
import { TouchableNativeFeedback, FlatList, View, Text } from 'react-native'
import { TextInput } from 'react-native-paper'
import { getOfferingsData, getStarredOfferings } from '../../api/offerings'
import CourseCard from '../../components/Cards/CourseCard'
import styles from './SearchContainer.style'
import { useLoadingWrap } from '../../hooks/useLoadingWrap'
import { NO_COURSES } from '../../constants'

/**
 * Renders the search screen for the application. This screen contains a single search bar and as the user types
 * in a query, cards corresponding to each offering are shown. The user can star and unstar courses from here.
 */
const SearchContainer = () => {
  const [currentQuery, setCurrentQuery] = useState('')
  const [filteredCourses, setFilteredCourses] = useState([])
  const [allCourses, setAllCourses] = useState([])
  const [isSearchDisabled, setSearchDisabled] = useState(true)
  const loadingWrap = useLoadingWrap()

  /**
   * Helper function to filter courses by the current query
   * @param offerings Pass in all offerings that student is allowed to access
   */
  const filterCourses = (offerings) => {
    const newOfferings = []

    offerings.forEach((offering) => {
      const course = offering.courses[0] || {}
      const departmentAcronym = course.departmentAcronym
      const courseNumber = course?.courseNumber
      const courseName = offering?.offering?.courseName
      const courseDescription = offering?.offering?.description
      const searchString = `${departmentAcronym} ${courseNumber} ${courseName} ${courseDescription}`

      if (searchString.toUpperCase().includes(currentQuery.toUpperCase()))
        newOfferings.push(offering)
    })

    return newOfferings
  }

  useEffect(() => {
    const fetchCourseInfo = async () => {
      setAllCourses([])
      setFilteredCourses([])
      setSearchDisabled(true)
      const offerings = await getOfferingsData()
      setAllCourses(offerings)
      setFilteredCourses(offerings)
      setSearchDisabled(false)
    }
    return loadingWrap(fetchCourseInfo)
  }, [setAllCourses])

  const onQueryChange = (text) => {
    setCurrentQuery(text)
    setFilteredCourses(filterCourses(allCourses))
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
      <View>
        <TouchableNativeFeedback>
          <View style={styles.cardContainer}>
            <CourseCard
              offeringId={courseId}
              departmentAcronym={course.departmentAcronym}
              courseNumber={course.courseNumber}
              courseName={courseName}
              courseDescription={courseDescription}
              isCourseStarred={isStarred}
              courseTerm={item.term.name}
              courseSection={item.offering.sectionName}
              testID="card"
            />
          </View>
        </TouchableNativeFeedback>
      </View>
    )
  }

  const renderSearchBar = () => {
    return (
      <TextInput
        style={styles.search}
        disabled={isSearchDisabled}
        onChangeText={onQueryChange}
        value={currentQuery}
        testID="searchBar"
        placeholder="Search for a Course"
        mode="outlined"
      />
    )
  }

  const renderCourses = () => {
    if (filteredCourses.length === 0) {
      return (
        <Text testID="courseList" style={styles.noCourses}>
          {NO_COURSES}
        </Text>
      )
    }

    return (
      <FlatList
        testID="courseList"
        keyExtractor={(course) => course.offering.id}
        data={filteredCourses}
        renderItem={renderCourseItem}
      />
    )
  }

  return (
    <View style={styles.viewStyle}>
      {renderSearchBar()}
      {renderCourses()}
    </View>
  )
}

export default SearchContainer
