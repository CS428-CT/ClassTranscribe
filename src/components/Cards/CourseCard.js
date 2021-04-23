import React, { useState } from 'react'
import { Text, View } from 'react-native'
import PropTypes from 'prop-types'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { truncateString } from '../../utils/string'
import styles from './CourseCard.style'
import { addStarredOferring, removeStarredOffering } from '../../api/offerings'

const MAX_DESCRIPTION_LENGTH = 100

/**
 * Component to render a single course item. Displays information about the course -- used in the HomeContainer
 * @param {String} departmentAcronym Example: "CS" or "ECE"
 * @param {String} courseNumber Example: "400" or "429"
 * @param {String} courseName The name of the course to be displayed
 * @param {String} courseDescription The full description of the course. Long course names will be truncated.
 * @param {Boolean} isCourseStarred Indicates whether the user has starred the course
 * @param {String} offeringId The unique ID for this offering
 * @returns
 */

const CourseCard = ({
  departmentAcronym,
  offeringId,
  courseNumber,
  courseName,
  courseSection,
  courseTerm,
  courseDescription = '',
  isCourseStarred,
}) => {
  const [isStarred, setIsStarred] = useState(isCourseStarred)
  const getCourseTitle = () => {
    return `${departmentAcronym} ${courseNumber}`
  }

  const getCourseName = () => {
    return `${courseName}`
  }

  /**
   * Called when the user wants to star an offering.
   * Usually, the request will succeed, so we will immediately update the star icon to make
   * the app feel fast. If it does fail (which is very rare), we will unstar it after the failure
   */
  const onCourseStarred = async () => {
    if (!isStarred) {
      setIsStarred(true)
      const wasSuccessful = await addStarredOferring(offeringId)
      setIsStarred(wasSuccessful)
    } else {
      setIsStarred(false)
      const wasSuccessful = await removeStarredOffering(offeringId)
      setIsStarred(!wasSuccessful)
    }
  }

  const getFavoriteButton = () => {
    if (isStarred) return <MaterialCommunityIcons name="star" size={30} onPress={onCourseStarred} />
    return <MaterialCommunityIcons name="star-outline" size={30} onPress={onCourseStarred} />
  }

  const getCourseSectionTerm = () => {
    return `${courseTerm} | ${courseSection}`
  }

  return (
    <View accessibilityRole="button" style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.courseTitle}>{getCourseTitle()}</Text>
        {getFavoriteButton()}
      </View>
      <Text accessibilityRole="button" style={styles.courseName}>
        {getCourseName()}
      </Text>
      <Text
        accessibilityRole="button"
        testID={getCourseSectionTerm()}
        style={styles.courseSectionTerm}
      >
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
  isCourseStarred: PropTypes.bool.isRequired,
  offeringId: PropTypes.string.isRequired,
  courseSection: PropTypes.string.isRequired,
  courseTerm: PropTypes.string.isRequired,
  courseDescription: PropTypes.string,
}

export default CourseCard
