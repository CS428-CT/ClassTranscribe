import React, { useState, useEffect } from 'react'
import { TouchableNativeFeedback, FlatList, View } from 'react-native'
import PropTypes from 'prop-types'
import { ListItem } from 'react-native-elements'
import { getUniversityDepartments } from '../../api/universities'
import { STACK_SCREENS } from '../CTNavigationContainer/index'

/**
 * Contains the home screen of the application. Lists starred courses and gives the user the ability
 * to search for courses. Clicking on a course shows the playlists for it.
 */
const DepartmentListContainer = ({ universityId, navigation }) => {
  const [departments, setDepartments] = useState([])

  useEffect(() => {
    const fetchDepartmentInfo = async () => {
      const uniDepartments = await getUniversityDepartments(universityId)
      setDepartments(uniDepartments)
    }

    fetchDepartmentInfo()
  }, [setDepartments])

  const onDepartmentSelected = (departmentId, departmentAcronym) => {
    navigation.push(STACK_SCREENS.COURSE_LIST, {
      departmentId,
      acronym: departmentAcronym,
    })
  }

  /**
   * Renders all of the users' starred courses into a FlatList
   */
  const renderItem = ({ item }) => {
    return (
      <TouchableNativeFeedback
        useForeground
        onPress={() => onDepartmentSelected(item, item.acronym)}
      >
        <ListItem key={(item.id, item.acronym)} bottomDivider>
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
