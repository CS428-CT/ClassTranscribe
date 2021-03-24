import React, { useState, useEffect } from 'react'
import { TouchableNativeFeedback, FlatList, View } from 'react-native'
// import PropTypes from 'prop-types'
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
      const courses = await getDepartmentCourses(departmentId)
      setCourses(courses)
    }

    fetchCourseInfo()
  }, [setCourses])

  const onCourseSelected = (courseId) => {    
    navigation.push(STACK_SCREENS.COURSE_PLAYLISTS, { courseId: courseId })
  }


  /**
   * Renders all of the users' starred courses into a FlatList
   */
  const renderItem = ({ item }) => {
    console.log(item)
    return (
      <TouchableNativeFeedback useForeground={true} onPress={() => onCourseSelected(item)}>
        <ListItem key={item.id} bottomDivider>
          <ListItem.Content>
            <ListItem.Title>{acronym} {item.courseNumber}</ListItem.Title>
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

// UniversityListContainer.propTypes = {
//     universityId: PropTypes.string.isRequired,
// }

export default CourseListContainer