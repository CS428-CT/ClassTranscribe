import React, { useState } from 'react'
import { Text, View } from 'react-native'
import PropTypes from 'prop-types'
import { truncateString } from '../../utils/string'
import styles from './CourseCard.style'
import { MaterialCommunityIcons } from '@expo/vector-icons'

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
  // TODO: Set initial state
  const [isStarred, setIsStarred] = useState(false);

  const getCourseTitle = () => {
    return `${departmentAcronym} ${courseNumber}`
  }

  const getCourseName = () => {
    return `${courseName}`
  }

  const getFavoriteButton = () => {
    if (isStarred)
      return <MaterialCommunityIcons name="star" size={30} />
    return <MaterialCommunityIcons name="star-outline" size={30} />
  }

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.courseTitle}>{getCourseTitle()}</Text>
        { getFavoriteButton() }
      </View>

      <Text style={styles.courseName}>{getCourseName()}</Text>
      <Text style={styles.courseContent}>
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
