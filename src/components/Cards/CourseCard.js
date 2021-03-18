import React from 'react'
import { Text, View } from 'react-native'
import PropTypes from 'prop-types'
import styles from './CourseCard.style'

const CourseCard = ({ departmentAcronym, courseNumber, courseName, courseDescription = "" }) => {

  const empHandle = (text) => {
    return text == null ? 'Content missing' : text
  }

  return (
    <View style={styles.card}>
      <Text style={(styles.container, styles.blue)}>
        {departmentAcronym} {courseNumber}: {empHandle(courseName)}
      </Text>

      <Text style={styles.container}>{courseDescription}</Text>
    </View>
  )
}

CourseCard.propTypes = {
  departmentAcronym: PropTypes.string.isRequired,
  courseNumber: PropTypes.string.isRequired,
  courseName: PropTypes.string.isRequired,
  courseDescription: PropTypes.string,
}
  
export default CourseCard
