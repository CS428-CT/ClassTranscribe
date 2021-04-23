import React, { useState, useEffect } from 'react'
import { TouchableNativeFeedback, FlatList, View, Text } from 'react-native'
import { Picker } from '@react-native-community/picker'
import PropTypes from 'prop-types'
import { getOfferingsData, getStarredOfferingsData, getStarredOfferings } from '../../api/offerings'
import { getUniversities, getUniversityDepartments } from '../../api/universities'
import { getCurrentAuthenticatedUser } from '../../api/auth'
import CourseCard from '../../components/Cards/CourseCard'
import { STACK_SCREENS } from '../CTNavigationContainer/index'
import styles from './Home.style'
import { useLoadingWrap } from '../../hooks/useLoadingWrap'
import { NO_STARRED_COURSES } from '../../constants'

/**
 * Contains the home screen of the application. Lists courses and gives the user the ability
 * to search for courses. Clicking on a course shows the playlists for it.
 */
const Home = ({ navigation }) => {
  const currentUser = getCurrentAuthenticatedUser()
  const loadingWrap = useLoadingWrap()
  let universityId = currentUser.universityId
  let departmentId = 'all'

  /**
   * Helper function to filter courses by university id
   * @param offerings Pass in all offerings that student is allowed to access only
   */
  const filterCourses = (offerings) => {
    const newOfferings = []
    for (const i in offerings) {
      if (offerings[i].term.universityId === universityId) {
        if (departmentId === 'all' || offerings[i].courses[0].departmentId === departmentId) {
          newOfferings.push(offerings[i])
        }
      }
    }

    return newOfferings
  }

  const [courses, setCourses] = useState([])
  useEffect(() => {
    const fetchCourseInfo = async () => {
      let offerings
      offerings = await getStarredOfferingsData()
      if (offerings.length === 1) {
        offerings = offerings[0]
      }

      const studentCourses = filterCourses(offerings)
      setCourses(studentCourses)
    }

    return loadingWrap(fetchCourseInfo, 'fetchCourses')
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
    const isStarred = courseId in getStarredOfferings()

    return (
      <View accessibilityRole="button" key={courseId}>
        <TouchableNativeFeedback
          accessibilityRole="button"
          onPress={() => onCourseSelected(courseId)}
        >
          <View accessibilityRole="button" style={styles.cardContainer}>
            <CourseCard
              offeringId={courseId}
              departmentAcronym={course.departmentAcronym}
              courseNumber={course.courseNumber}
              courseName={courseName}
              courseSection={item.offering.sectionName}
              courseTerm={item.term.name}
              courseDescription={courseDescription}
              isCourseStarred={isStarred}
              accessibilityRole="button"
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
      loadingWrap(fetchUniversities, 'fetchUniversities')
    }, [setAllUniversities])

    const universityItems = universities.map((uni) => {
      return <Picker.Item key={uni.id} value={uni.id} label={uni.name} />
    })

    const [university, setUniversity] = useState(universityId)
    const onUniversitySelected = async (newUniversityId) => {
      const updateDepartment = async () => {
        setCourses([])
        setUniversity(newUniversityId)
        universityId = newUniversityId

        const allCourses = await getOfferingsData()
        const newCourses = filterCourses(allCourses)

        setCourses(newCourses)
      }

      loadingWrap(updateDepartment, 'updateDepartment')
    }

    return (
      <View style={styles.universityDropdown}>
        <Picker
          testID="uniPicker"
          selectedValue={university}
          onValueChange={(newUniversityId) => onUniversitySelected(newUniversityId)}
        >
          {universityItems}
        </Picker>
      </View>
    )
  }

  /**
   * Render department's course offerings in a dropdown picker based on department id.
   */
  const renderDepartmentsDropDown = () => {
    const [departments, setAllDepartments] = useState([])
    useEffect(
      () => {
        const fetchDepartments = async () => {
          const allDept = await getUniversityDepartments(universityId)
          setAllDepartments(allDept)
        }

        fetchDepartments()
      },
      [setAllDepartments],
      universityId
    )

    const departmentItems = departments.map((dept) => {
      return <Picker.Item key={dept.id} value={dept.id} label={dept.name} />
    })

    const [department, setDepartment] = useState(departmentId)
    const onDepartmentSelected = async (newDepartmentId) => {
      const updateDepartment = async () => {
        setCourses([])
        setDepartment(newDepartmentId)
        departmentId = newDepartmentId

        const allCourses = await getOfferingsData()
        const newCourses = filterCourses(allCourses)

        setCourses(newCourses)
      }

      loadingWrap(updateDepartment, 'updateDepartment')
    }

    return (
      <View style={styles.dropdown}>
        <Picker
          testID="deptPicker"
          selectedValue={department}
          onValueChange={(newDepartmentId) => onDepartmentSelected(newDepartmentId)}
        >
          <Picker.Item key="all" value="all" label="All Departments" />
          {departmentItems}
        </Picker>
      </View>
    )
  }

  /**
   * Renders all of the users' courses into a FlatList
   */
  const renderCourses = () => {
    if (courses.length === 0) {
      return (
        <Text testID="courseList" style={styles.noCourses}>
          {NO_STARRED_COURSES}
        </Text>
      )
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
      {renderDepartmentsDropDown()}
      {renderCourses()}
    </View>
  )
}

Home.propTypes = {
  navigation: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}

export default Home
