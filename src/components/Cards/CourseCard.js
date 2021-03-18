import React from 'react'
import { Text, View } from 'react-native'
import PropTypes from 'prop-types'
import { truncateString } from '../../utils/string'
import styles from './CourseCard.style'

const MAX_DESCRIPTION_LENGTH = 100

const CourseCard = ({ departmentAcronym, courseNumber, courseName, courseDescription = '' }) => {
  const getCourseTitle = () => {
    return `${departmentAcronym} ${courseNumber}: ${courseName}`
  }

  return (
    <View style={styles.card}>
      <Text style={(styles.container, styles.blue)}>{getCourseTitle()}</Text>

      <Text style={styles.container}>
        {truncateString(courseDescription, MAX_DESCRIPTION_LENGTH)}
      </Text>
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
