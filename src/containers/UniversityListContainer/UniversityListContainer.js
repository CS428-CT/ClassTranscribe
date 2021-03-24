import React, { useState, useEffect } from 'react'
import { TouchableNativeFeedback, FlatList, View } from 'react-native'
// import PropTypes from 'prop-types'
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
      const universities = await getUniversities()
      setUniversities(universities)
    }

    fetchUniversityInfo()
  }, [setUniversities])

  const onUniversitySelected = (universityId) => {
    // Retrieve all departments in selected uni
    // Display the departments
    navigation.push(STACK_SCREENS.HOME, { courseId: '57afb8e6-76c8-4d22-b04c-5fbf912024ed' })
  }

  /**
   * Renders all of the users' starred courses into a FlatList
   */
  const renderItem = ({ item }) => {
    return (
      <TouchableNativeFeedback onPress={() => onUniversitySelected(item)}>
        <ListItem key={item.id} bottomDivider>
          <ListItem.Content>
            <ListItem.Title>{item.name}</ListItem.Title>
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

// UniversityListContainer.propTypes = {
//     universityId: PropTypes.string.isRequired,
// }

export default UniversityListContainer
