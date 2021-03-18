import React, { useState, useEffect } from 'react'
import { Text, FlatList, View } from 'react-native'
import { getStarredOfferingsData } from '../../api/offerings'
import CourseCard from '../../components/Cards/CourseCard'
import styles from './Home.style'

const Home = () => {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    const fetchCourseInfo = async () => {
      const offerings = await getStarredOfferingsData()
      setCourses(offerings)
    }

    fetchCourseInfo()
  }, [setCourses])

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

  const renderSeparator = () => {
    return <View style={styles.seperator} />
  }

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
