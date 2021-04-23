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
const CourseCard = ({
  departmentAcronym,
  courseNumber,
  courseName,
  courseSection,
  courseTerm,
  courseDescription = '',
}) => {
  const getCourseTitle = () => {
    return `${departmentAcronym} ${courseNumber}`
  }

  const getCourseName = () => {
    return `${courseName}`
  }

  const getCourseSectionTerm = () => {
    return `${courseTerm} | ${courseSection}`
  }

  return (
    <View accessibilityRole="button" style={styles.card}>
      <Text accessibilityRole="button" style={styles.courseTitle}>{getCourseTitle()}</Text>
      <Text accessibilityRole="button" style={styles.courseName}>{getCourseName()}</Text>
      <Text accessibilityRole="button" testID={getCourseSectionTerm()} style={styles.courseSectionTerm}>
        {getCourseSectionTerm()}
      </Text>
      <Text accessibilityRole="button" style={styles.courseContent}>
        {truncateString(courseDescription, MAX_DESCRIPTION_LENGTH)}
      </Text>
    </View>
  )
}

CourseCard.propTypes = {
  departmentAcronym: PropTypes.string.isRequired,
  courseNumber: PropTypes.string.isRequired,
  courseName: PropTypes.string.isRequired,
  courseSection: PropTypes.string.isRequired,
  courseTerm: PropTypes.string.isRequired,
  courseDescription: PropTypes.string,
}

export default CourseCard
