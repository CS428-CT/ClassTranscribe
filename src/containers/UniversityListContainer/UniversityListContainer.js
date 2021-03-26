import React, { useState, useEffect } from 'react'
import { TouchableNativeFeedback, FlatList, View } from 'react-native'
import PropTypes from 'prop-types'
import { ListItem } from 'react-native-elements'
import { getUniversities } from '../../api/universities'
import { STACK_SCREENS } from '../CTNavigationContainer/index'

/**
 * Contains the home screen of the application. Lists starred courses and gives the user the ability
 * to search for courses. Clicking on a course shows the playlists for it.
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

  const onUniversitySelected = (universityId) => {
    navigation.push(STACK_SCREENS.DEPT_LIST, { universityId })
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
