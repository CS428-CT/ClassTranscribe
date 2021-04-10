import React, { useState, useEffect } from 'react'
import { TouchableNativeFeedback, FlatList, View } from 'react-native'
import PropTypes from 'prop-types'
import { ListItem } from 'react-native-elements'
import { getVideoTranscription } from '../../api/universities'
import { STACK_SCREENS } from '../CTNavigationContainer/index'

/**
 * NEW CONTENT HERE!!!
 *
 * Contains the course screen of the application. Lists all courses
 * that participate (i.e. instructor has registered the courses and
 * uploads videos) in Class Transcribe. Clicking on a course shows the user's
 * starred offerings for it.
 */
const TranscriptContainer = ({ navigation, transcriptId }) => {
  const [transcript, setTranscript] = useState([])

  useEffect(() => {
    const fetchTranscriptInfo = async () => {
      const videoTranscript = await getVideoTranscription(departmentId)
      setTranscript(videoTranscript)
    }

    fetchTranscriptInfo()
  }, [setTranscript])

  const onLineSelected = (transcriptLine) => {
    // Allow user to edit the line and save/cancel it
    // somewhat like how web is structured
  }

  /**
   * Renders all of the users' starred courses into a FlatList
   */
  const renderItem = ({ item }) => {
    return (
      <TouchableNativeFeedback useForeground onPress={() => onLineSelected(item.text)}>
        <ListItem key={item.id} bottomDivider>
          <ListItem.Content>
            <ListItem.Title accessibilityRole="button">{item.text}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </TouchableNativeFeedback>
    )
  }

  return (
    <View>
      <FlatList data={transcript} renderItem={renderItem} />
    </View>
  )
}

TranscriptContainer.propTypes = {
  transcriptId: PropTypes.string.isRequired,
  navigation: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}

export default TranscriptContainer
