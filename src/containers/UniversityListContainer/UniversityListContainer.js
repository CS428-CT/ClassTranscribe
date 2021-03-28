import React, { useState, useEffect } from 'react'
import { TouchableNativeFeedback, FlatList, View } from 'react-native'
import PropTypes from 'prop-types'
import { ListItem } from 'react-native-elements'
import { getUniversities } from '../../api/universities'
import { STACK_SCREENS } from '../CTNavigationContainer/index'

/**
 * Contains the university screen of the application. Lists all universities
 * that participate (i.e. have registered departments in the application)
 * in Class Transcribe (CT). Clicking on a university shows the departments
 * with courses that participate in CT.
 */
const UniversityListContainer = ({ navigation }) => {
  const [universities, setUniversities] = useState([])

  useEffect(() => {
    const fetchUniversityInfo = async () => {
      const allUniversities = await getUniversities()
      setUniversities(allUniversities)
    }

    fetchUniversityInfo()
  }, [setUniversities])

  const onUniversitySelected = (university) => {
    navigation.push(STACK_SCREENS.DEPT_LIST, { universityId: university.id })
  }

  /**
   * Renders all of the users' starred courses into a FlatList
   */
  const renderItem = ({ item }) => {
    return (
      <TouchableNativeFeedback useForeground onPress={() => onUniversitySelected(item)}>
        <ListItem key={item.id} bottomDivider>
          <ListItem.Content>
            <ListItem.Title accessibilityRole="button">{item.name}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </TouchableNativeFeedback>
    )
  }

  return (
    <View>
      <FlatList data={universities} renderItem={renderItem} />
    </View>
  )
}

UniversityListContainer.propTypes = {
  navigation: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}

export default UniversityListContainer
