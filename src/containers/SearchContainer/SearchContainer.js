import React, { useState, useEffect } from 'react'
import { TouchableNativeFeedback, FlatList, View, Text } from 'react-native'
import { Picker } from '@react-native-community/picker'
import { TextInput } from 'react-native-paper'
import { getOfferingsData, getStarredOfferings } from '../../api/offerings'
import CourseCard from '../../components/Cards/CourseCard'
import styles from './SearchContainer.style'
import { useLoadingWrap } from '../../hooks/useLoadingWrap'
import { NO_COURSES } from '../../constants'
import { getCurrentAuthenticatedUser } from '../../api/auth'
import { getUniversities, getUniversityDepartments } from '../../api/universities'

const SearchContainer = () => {
  const [currentQuery, setCurrentQuery] = useState('')
  const [filteredCourses, setFilteredCourses] = useState([])
  const [allCourses, setAllCourses] = useState([])
  const [isSearchDisabled, setSearchDisabled] = useState(true)
  const [departments, setAllDepartments] = useState([])
  const [universities, setAllUniversities] = useState([])
  const [universityId, setUniversityId] = useState(getCurrentAuthenticatedUser()?.universityId)
  const [departmentId, setDepartmentId] = useState('all');
  const loadingWrap = useLoadingWrap()

  useEffect(() => {
    const fetchInfo = async () => {
      setAllCourses([])
      setFilteredCourses([])
      setAllUniversities([])
      setSearchDisabled(true)

      const offerings = await getOfferingsData()
      const allUnis = await getUniversities()

      setAllCourses(offerings)
      setFilteredCourses(filterCourses(offerings))
      setAllUniversities(allUnis)
      setSearchDisabled(false)
    }
    return loadingWrap(fetchInfo, "fetchCourseAndUniInfo")
  }, [setAllCourses, setFilteredCourses, setAllDepartments, setSearchDisabled])

  useEffect(() => {
    const fetchInfo = async () => {
      setAllDepartments([])
      const allDepts = await getUniversityDepartments(universityId)
      setAllDepartments(allDepts)
    }

    return loadingWrap(fetchInfo, "fetchDeptInfo")
  }, [universityId])

  useEffect(() => {
    setFilteredCourses(filterCourses(allCourses))
  }, [departmentId, universityId])

  /**
   * Helper function to filter courses by the current query
   * @param offerings Pass in all offerings that student is allowed to access
   */
  const filterCourses = (offerings) => {
    const newOfferings = []

    offerings.forEach((offering) => {
      if (offering?.term?.universityId.toString() !== universityId.toString())
        return;

      if (departmentId !== 'all' && offering?.courses?.length && offering?.courses[0]?.departmentId !== departmentId)
        return;

      const course = offering.courses[0] || {}
      const departmentAcronym = course.departmentAcronym
      const courseNumber = course?.courseNumber
      const courseName = offering?.offering?.courseName
      const courseDescription = offering?.offering?.description
      const searchString = `${departmentAcronym} ${courseNumber} ${courseName} ${courseDescription}`

      if (searchString.toUpperCase().includes(currentQuery.toUpperCase()))
        newOfferings.push(offering)
    })

    return newOfferings
  }


  const onQueryChange = (text) => {
    setCurrentQuery(text)
    setFilteredCourses(filterCourses(allCourses))
  }

  const onDepartmentSelected = async (newDepartmentId) => {
    setDepartmentId(newDepartmentId);
  }

  const onUniversitySelected = async (newUniversityId) => {
    setUniversityId(newUniversityId);
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
      <View>
        <TouchableNativeFeedback>
          <View style={styles.cardContainer}>
            <CourseCard
              offeringId={courseId}
              departmentAcronym={course.departmentAcronym}
              courseNumber={course.courseNumber}
              courseName={courseName}
              courseDescription={courseDescription}
              isCourseStarred={isStarred}
              courseTerm={item.term.name}
              courseSection={item.offering.sectionName}
              testID="card"
            />
          </View>
        </TouchableNativeFeedback>
      </View>
    )
  }

  const renderSearchBar = () => {
    return (
      <TextInput
        style={styles.search}
        disabled={isSearchDisabled}
        onChangeText={onQueryChange}
        value={currentQuery}
        testID="searchBar"
        placeholder="Search for a Course"
        mode="outlined"
      />
    )
  }

  const renderCourses = () => {
    if (filteredCourses.length === 0) {
      return (
        <Text testID="courseList" style={styles.noCourses}>
          {NO_COURSES}
        </Text>
      )
    }

    return (
      <FlatList
        testID="courseList"
        keyExtractor={(course) => course.offering.id}
        data={filteredCourses}
        renderItem={renderCourseItem}
      />
    )
  }
  /**
   * Render universities' course offerings in a dropdown picker based on university id.
   */
  const renderUniversitiesDropdown = () => {
    const universityItems = universities.map((uni) => {
      return <Picker.Item key={uni.id} value={uni.id} label={uni.name} />
    })

    return (
      <View style={styles.universityDropdown}>
        <Picker
          testID="uniPicker"
          selectedValue={universityId}
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
  const renderDepartmentsDropdown = () => {
    const departmentItems = departments.map((dept) => {
      return <Picker.Item key={dept.id} value={dept.id} label={dept.name} />
    })

    return (
      <View style={styles.dropdown}>
        <Picker
          testID="deptPicker"
          selectedValue={departmentId}
          onValueChange={(newDepartmentId) => onDepartmentSelected(newDepartmentId)}
        >
          <Picker.Item key="all" value="all" label="All Departments" />
          {departmentItems}
        </Picker>
      </View>
    )
  }

  return (
    <View style={styles.viewStyle}>
      {renderUniversitiesDropdown()}
      {renderDepartmentsDropdown()}
      {renderSearchBar()}
      {renderCourses()}
    </View>
  )
}

export default SearchContainer