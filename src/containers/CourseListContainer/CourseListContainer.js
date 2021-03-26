import React, { useState, useEffect } from 'react'
import { TouchableNativeFeedback, FlatList, View } from 'react-native'
import PropTypes from 'prop-types'
import { ListItem } from 'react-native-elements'
import { getDepartmentCourses } from '../../api/universities'
import { STACK_SCREENS } from '../CTNavigationContainer/index'

/**
 * Contains the home screen of the application. Lists starred courses and gives the user the ability
 * to search for courses. Clicking on a course shows the playlists for it.
 */
const CourseListContainer = ({ departmentId, acronym, navigation }) => {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    const fetchCourseInfo = async () => {
      const deptCourses = await getDepartmentCourses(departmentId)
      setCourses(deptCourses)
    }

    fetchCourseInfo()
  }, [setCourses])

  const onCourseSelected = (/* courseId */) => {
    navigation.push(STACK_SCREENS.HOME, { /* courseId */ })
  }

  /**
   * Renders all of the users' starred courses into a FlatList
   */
  const renderItem = ({ item }) => {
    return (
      <TouchableNativeFeedback useForeground onPress={() => onCourseSelected( /*item*/ )}>
        <ListItem key={item.id} bottomDivider>
          <ListItem.Content>
            <ListItem.Title accessibilityRole="button">{acronym} {item.courseNumber}</ListItem.Title>
            <ListItem.Subtitle style={{ fontSize: 0, color: "#00000000" }}>{item.courseNumber}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </TouchableNativeFeedback>
    )
  }

  return (
    <View>
      <FlatList data={courses} renderItem={renderItem} />
    </View>
  )
}

CourseListContainer.propTypes = {
  departmentId: PropTypes.string.isRequired,
  acronym: PropTypes.string.isRequired,
  navigation: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}

export default CourseListContainer
