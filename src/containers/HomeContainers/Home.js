import React, { useState, useEffect } from 'react'
import { Text, FlatList, View } from 'react-native'
import { getStarredOfferingsData } from '../../api/offerings'
import CourseCard from '../../components/Cards/CourseCard'
import styles from './Home.style'

/**
 * Contains the home screen of the application. Lists starred courses and gives the user the ability
 * to search for courses. Clicking on a course shows the playlists for it.
 */
const Home = () => {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    const fetchCourseInfo = async () => {
      const offerings = await getStarredOfferingsData()
      setCourses(offerings)
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

    return (
      <View style={styles.container}>
        <CourseCard
          key={course.courseId}
          departmentAcronym={course.departmentAcronym}
          courseNumber={course.courseNumber}
          courseName={courseName}
          courseDescription={courseDescription}
        />
        <Text style={styles.placeholder}>Video Placeholder</Text>
      </View>
    )
  }

  /**
   * Renders the separator for the course list
   */
  const renderSeparator = () => {
    return <View style={styles.seperator} />
  }

  /**
   * Renders all of the users' starred courses into a FlatList
   */
  const renderStarredCourses = () => {
    if (courses == null) return null

    return (
      <FlatList
        data={courses}
        renderItem={renderCourseItem}
        ItemSeparatorComponent={renderSeparator}
      />
    )
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {renderStarredCourses()}
    </View>
  )
}

export default Home
