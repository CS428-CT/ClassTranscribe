import React from 'react'
import { Text, View } from 'react-native'
import PropTypes from 'prop-types'
import { truncateString } from '../../utils/string'
import styles from './CourseCard.style'

const MAX_DESCRIPTION_LENGTH = 100

/**
 * Component to render a single course item. Displays information about the course -- used in the HomeContainer
 * @param {String} departmentAcronym Example: "CS" or "ECE"
 * @param {String} courseNumber Example: "400" or "429"
 * @param {String} courseName The name of the course to be displayed
 * @param {String} courseDescription The full description of the course. Long course names will be truncated.
 * @returns
 */
const CourseCard = ({ departmentAcronym, courseNumber, courseName, courseDescription = '' }) => {
  const getCourseTitle = () => {
    return `${departmentAcronym} ${courseNumber}`
  }

  const getCourseName = () => {
    return `${courseName}`
  }

  return (
    <View style={styles.card}>
      <Text style={(styles.container, styles.courseTitle)}>{getCourseTitle()}</Text>
      <Text style={(styles.container, styles.courseName)}>{getCourseName()}</Text>
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
