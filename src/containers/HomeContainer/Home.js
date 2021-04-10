import React, { useState, useEffect } from 'react'
import { TouchableNativeFeedback, Switch, FlatList, View, Text } from 'react-native'
import { Picker } from '@react-native-community/picker'
import PropTypes from 'prop-types'
import { getOfferingsData } from '../../api/offerings'
import { getUniversities } from '../../api/universities'
import { getCurrentAuthenticatedUser } from '../../api/auth'
import CourseCard from '../../components/Cards/CourseCard'
import Recommend from '../../components/Recommend/Recommend'
import { STACK_SCREENS } from '../CTNavigationContainer/index'
import styles from './Home.style'

/**
 * Contains the home screen of the application. Lists courses and gives the user the ability
 * to search for courses. Clicking on a course shows the playlists for it.
 */
const Home = ({ navigation }) => {
  const currentUser = getCurrentAuthenticatedUser()
  const universityId = currentUser.universityId

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
      const offerings = await getOfferingsData()
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
      <View style={styles.container} key={courseId}>
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
        <View key={courseName} style={styles.recContainer}>
          <Recommend key={courseId} navigation={navigation} courseId={courseId} mode={mode} />
        </View>
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
      return <Picker.Item accessibilityRole="button" key={uni.id} value={uni.id} label={uni.name} />
    })

    const [university, setUniversity] = useState(universityId)

    const onUniversitySelected = async (newUniversityId) => {
      // Reload the page for the selected universityId
      setUniversity(newUniversityId)

      const newUnicourses = await getOfferingsData()
      const newCourses = filterCourses(newUnicourses)

      try {
        setCourses(newCourses)
        renderCourseItem()
      } catch (error) {
        console.error(error)
      }
    }

    return (
      <Picker
        style={{ flex: 0, width: '100%' }}
        selectedValue={university}
        onValueChange={(newUniversityId) => onUniversitySelected(newUniversityId)}
      >
        {universityItems}
      </Picker>
    )
  }

  /**
   * Renders all of the users' courses into a FlatList
   */
  const renderStarredCourses = () => {
    if (courses == null) return null

    return (
      <FlatList
        keyExtractor={(idxCourses, index) => index.toString()}
        data={courses}
        renderItem={renderCourseItem}
      />
    )
  }

  const [mode, setMode] = useState(false)
  const renderSwitch = () => {
    return (
      <View style={styles.Container}>
        <Text>Latest Video Mode: {mode.toString()}</Text>
        <Switch
          trackColor={{ false: 'black', true: 'grey' }}
          thumbColor={mode ? 'purple' : 'black'}
          onValueChange={() => setMode(!mode)}
          value={mode}
        />
      </View>
    )
  }

  return (
    <View style={styles.viewStyle}>
      {renderUniversityDropDown()}
      {renderSwitch()}
      {renderStarredCourses()}
    </View>
  )
}

Home.propTypes = {
  navigation: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}

export default Home
