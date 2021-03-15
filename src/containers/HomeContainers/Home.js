/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react'
import { Text, FlatList, View } from 'react-native'
import { getStarredOfferingsData } from '../../api/offerings'
import CourseCard from '../../components/Cards/CourseCard'
import styles from './Home.style'

function fetchCourseInfo(setCourses) {
  getStarredOfferingsData()
    .then((response) => {
      console.log(response)
      return response
    })
    .then((data) => setCourses(data))
}

const renderCourseItem = ({ item }) => {
  const info = {
    courseId: item.courses[0].courseId,
    courseName: item.courses[0].courseName,
    departmentAcronym: item.courses[0].departmentAcronym,
    courseNumber: item.courses[0].courseNumber,
  }

  return (
    <View style={styles.container}>
      <CourseCard {...info} />
      <Text style={styles.placeholder}>Video Placeholder</Text>
    </View>
  )
}

const renderSeparator = () => {
  return <View style={styles.seperator} />
}

function Home() {
  const [mounted, setMounted] = useState(false)
  const [courses, setCourses] = useState(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // componentWillMount
  if (!mounted) {
    fetchCourseInfo(setCourses)
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {courses != null && (
        <FlatList
          data={courses}
          renderItem={renderCourseItem}
          ItemSeparatorComponent={renderSeparator}
        />
      )}
    </View>
  )
}
export default Home
