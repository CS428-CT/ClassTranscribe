import React, { useState, useEffect } from 'react'
import { TouchableNativeFeedback, Switch, FlatList, View, Text } from 'react-native'
import PropTypes from 'prop-types'
import { getStarredOfferingsData } from '../../api/offerings'
import CourseCard from '../../components/Cards/CourseCard'
import Recommend from '../../components/Recommend/Recommend'
import { STACK_SCREENS } from '../CTNavigationContainer/index'
import styles from './Home.style'

/**
 * Contains the home screen of the application. Lists starred courses and gives the user the ability
 * to search for courses. Clicking on a course shows the playlists for it.
 */
const Home = ({ navigation }) => {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    const fetchCourseInfo = async () => {
      const offerings = await getStarredOfferingsData()
      setCourses(offerings)
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
      <View style={styles.container}>
        <TouchableNativeFeedback onPress={() => onCourseSelected(courseId)}>
          <View style={{ width: '50%' }}>
            <CourseCard
              key={courseId}
              departmentAcronym={course.departmentAcronym}
              courseNumber={course.courseNumber}
              courseName={courseName}
              courseDescription={courseDescription}
            />
          </View>
        </TouchableNativeFeedback>
        <View>
          <Recommend navigation={navigation} courseId={courseId} mode={mode} />
        </View>
      </View>
    )
  }

  /**
   * Renders the separator for the course list
   */
  const renderSeparator = () => {
    return <View style={styles.seperator} />
  }

  /**
   * Renders all of the users' starred courses into a FlatList
   */
  const renderStarredCourses = () => {
    if (courses == null) return null

    return (
      <FlatList
        data={courses}
        renderItem={renderCourseItem}
        ItemSeparatorComponent={renderSeparator}
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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
