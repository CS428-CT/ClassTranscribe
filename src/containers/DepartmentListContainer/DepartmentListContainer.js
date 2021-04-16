import React, { useState, useEffect } from 'react'
import { TouchableNativeFeedback, FlatList, View } from 'react-native'
import PropTypes from 'prop-types'
import { ListItem } from 'react-native-elements'
import { getUniversityDepartments } from '../../api/universities'
import { STACK_SCREENS } from '../CTNavigationContainer/index'
import { useLoadingWrap } from '../../hooks/useLoadingWrap'

/**
 * Contains the department list screen. Lists all departments that
 * participate in Class Transcribe (CT) at a particular university.
 * Clicking on a department shows all the courses that participate
 * in CT.
 */
const DepartmentListContainer = ({ universityId, navigation }) => {
  const [departments, setDepartments] = useState([])
  const loadingWrap = useLoadingWrap()

  useEffect(() => {
    const fetchDepartmentInfo = async () => {
      const uniDepartments = await getUniversityDepartments(universityId)
      setDepartments(uniDepartments)
    }

    return loadingWrap(fetchDepartmentInfo)
  }, [setDepartments])

  const onDepartmentSelected = (departmentId, departmentAcronym) => {
    navigation.push(STACK_SCREENS.COURSE_LIST, {
      departmentId,
      acronym: departmentAcronym,
    })
  }

  /**
   * Renders all of the departments in a particular university into a FlatList
   */
  const renderItem = ({ item }) => {
    return (
      <TouchableNativeFeedback
        useForeground
        key={(item.id, item.acronym)}
        onPress={() => onDepartmentSelected(item.id, item.acronym)}
      >
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title accessibilityRole="button">{item.name}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </TouchableNativeFeedback>
    )
  }

  return (
    <View>
      <FlatList data={departments} renderItem={renderItem} />
    </View>
  )
}

DepartmentListContainer.propTypes = {
  universityId: PropTypes.string.isRequired,
  navigation: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}

export default DepartmentListContainer
