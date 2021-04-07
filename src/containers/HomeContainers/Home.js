import React, { useState, useEffect } from 'react'
import { TouchableNativeFeedback, Switch, FlatList, View, Text } from 'react-native'
// import { Picker } from '@react-native-picker/picker';
import PropTypes from 'prop-types'
import { getStarredOfferingsData, getOfferingsData } from '../../api/offerings'
// import { getCurrentAuthenticatedUser } from '../../api/auth'
import CourseCard from '../../components/Cards/CourseCard'
import Recommend from '../../components/Recommend/Recommend'
import { STACK_SCREENS } from '../CTNavigationContainer/index'
import styles from './Home.style'

/**
 * Contains the home screen of the application. Lists courses and gives the user the ability
 * to search for courses. Clicking on a course shows the playlists for it.
 */
const Home = ({ navigation }) => {
  const [courses, setCourses] = useState([])
  useEffect(() => {
    const fetchCourseInfo = async () => {
      const offerings = await getOfferingsData()
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
          <View style={styles.cardContainer}>
            <CourseCard
              key={courseId}
              departmentAcronym={course.departmentAcronym}
              courseNumber={course.courseNumber}
              courseName={courseName}
              courseDescription={courseDescription}
            />
          </View>
        </TouchableNativeFeedback>
        <View style={styles.recContainer}>
          <Recommend navigation={navigation} courseId={courseId} mode={mode} />
        </View>
      </View>
    )
  }

  /**
   * Render user's login information
   */
  // const [universities, setSelectedUniversity] = useState([]);
  // useEffect(() => {
  //   const fetchUniversityInfo = async () => {
  //     const allUniversities = await getUniversities()
  //     setSelectedUniversity(allUniversities)
  //   }
  //   fetchUniversityInfo()
  // }, [setSelectedUniversity])

  // const renderUniversityDropDown = () => {
  //     const currentUser = getCurrentAuthenticatedUser()
  //     const universityId = currentUser.universityId

  //     console.log("WERE HERE!!!!!!!!!!!!!!")
  //     console.log(universities)
  //     const universityItems = universities.map( (uni) => {
  //       return <Picker.Item value={uni.name} label={uni.id}/>
  //     })
  //     return (<Picker
  //             selectedValue={ universityId }
  //             onValueChange={(university) => setSelectedUniversity(university)}
  //             mode='dropdown'>
  //               { universityItems }
  //     </Picker>)
  //   // return <Text>{ universityId }</Text>
  // }

  /**
   * Renders all of the users' courses into a FlatList
   */
  const renderStarredCourses = () => {
    if (courses == null) return null

    return <FlatList data={courses} renderItem={renderCourseItem} />
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
      {/* {renderUniversityDropDown()} */}
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
