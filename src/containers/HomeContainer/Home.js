import React, { useState, useEffect } from 'react'
import { TouchableNativeFeedback, FlatList, View, Text } from 'react-native'
import { Picker } from '@react-native-community/picker'
import PropTypes from 'prop-types'
import { getOfferingsData, getStarredOfferingsData } from '../../api/offerings'
import { getUniversities } from '../../api/universities'
import { getCurrentAuthenticatedUser } from '../../api/auth'
import CourseCard from '../../components/Cards/CourseCard'
import { STACK_SCREENS } from '../CTNavigationContainer/index'
import styles from './Home.style'
import { NO_COURSES, NO_STARRED_COURSES } from '../../constants'

/**
 * Contains the home screen of the application. Lists courses and gives the user the ability
 * to search for courses. Clicking on a course shows the playlists for it.
 */
const Home = ({ starred, navigation }) => {
  const currentUser = getCurrentAuthenticatedUser()
  let universityId = currentUser.universityId

  /**
   * Helper function to filter courses by university id
   * @param offerings Pass in all offerings that student is allowed to access only
   */
  const filterCourses = (offerings) => {
    const newOfferings = []
    for (const i in offerings) {
      if (offerings[i].term.universityId === universityId) {
        newOfferings.push(offerings[i])
      }
    }

    return newOfferings
  }

  const [courses, setCourses] = useState([])
  useEffect(() => {
    const fetchCourseInfo = async () => {
      let offerings
      if (starred) {
        offerings = await getStarredOfferingsData()
      } else {
        offerings = await getOfferingsData()
      }
      const studentCourses = filterCourses(offerings)
      setCourses(studentCourses)
    }
    fetchCourseInfo()
  }, [setCourses])

  const onCourseSelected = (courseId) => {
    navigation.push(STACK_SCREENS.COURSE_PLAYLISTS, { courseId })
  }

  /**
   * Renders a single course in the course list.
   * @param {Object} item The underlying data for the item to render.
   */
  const renderCourseItem = ({ item }) => {
    if (item.length === 0) return null

    const course = item.courses[0]
    const { courseName } = item.offering
    const courseDescription = item.offering.description
    const courseId = item.offering.id

    return (
      <View key={courseId}>
        <TouchableNativeFeedback onPress={() => onCourseSelected(courseId)}>
          <View style={styles.cardContainer}>
            <CourseCard
              departmentAcronym={course.departmentAcronym}
              courseNumber={course.courseNumber}
              courseName={courseName}
              courseDescription={courseDescription}
            />
          </View>
        </TouchableNativeFeedback>
      </View>
    )
  }

  /**
   * Render universities' course offerings in a dropdown picker based on university id.
   */
  const renderUniversityDropDown = () => {
    const [universities, setAllUniversities] = useState([])
    useEffect(() => {
      const fetchUniversities = async () => {
        const allUnis = await getUniversities()
        setAllUniversities(allUnis)
      }
      fetchUniversities()
    }, [setAllUniversities])

    const universityItems = universities.map((uni) => {
      return <Picker.Item key={uni.id} value={uni.id} label={uni.name} />
    })

    const [university, setUniversity] = useState(universityId)
    const onUniversitySelected = async (newUniversityId) => {
      setUniversity(newUniversityId)
      universityId = newUniversityId

      const newUnicourses = await getOfferingsData()
      const newCourses = filterCourses(newUnicourses)

      try {
        setCourses(newCourses)
      } catch (error) {
        console.error(error)
      }
    }

    return (
      <View style={styles.dropdown}>
        <Picker
          testID="picker"
          selectedValue={university}
          onValueChange={(newUniversityId) => onUniversitySelected(newUniversityId)}
        >
          {universityItems}
        </Picker>
      </View>
    )
  }

  /**
   * Renders all of the users' courses into a FlatList
   */
  const renderCourses = () => {
    if (courses.length === 0) {
      if (starred) {
        return <Text testID="courseList" style={styles.noCourses}>{NO_STARRED_COURSES}</Text>
      }
      return <Text testID="courseList" style={styles.noCourses}>{NO_COURSES}</Text>
    }

    return (
      <FlatList
        testID="courseList"
        keyExtractor={(idxCourses, index) => index.toString()}
        data={courses}
        renderItem={renderCourseItem}
      />
    )
  }

  return (
    <View style={styles.viewStyle}>
      {renderUniversityDropDown()}
      {renderCourses()}
    </View>
  )
}

Home.propTypes = {
  navigation: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  starred: PropTypes.bool.isRequired,
}

export default Home
