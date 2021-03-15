/* eslint-disable react/prop-types */
import React from 'react'
import { Text, View } from 'react-native'
import styles from './CourseCard.style'

const empHandle = (text) => {
  return text == null ? 'Content missing' : text
}

function CourseCard({ departmentAcronym, courseNumber, courseName }) {
  return (
    <View style={styles.card}>
      <Text style={(styles.container, styles.blue)}>
        {departmentAcronym} {courseNumber}: {empHandle(courseName)}
      </Text>

      <Text style={styles.container}>Lorem ipsum dolor sit amet, consectetur adipisicing elit</Text>

      <Text style={(styles.container, styles.blue)}>Footer</Text>
    </View>
  )
}
export default CourseCard
