import React from 'react'
import { Text, View } from 'react-native'
import PropTypes from 'prop-types'
import styles from './VideoCard.style'

/**
 * Renders information about the watch history of a video
 * @param {String} name The video name
 * @param {String} ratio A number in [0, 100] representing the percent of the video watched by the user
 * @returns Children of component
 */
const VideoCard = ({ name, ratio }) => {
  return (
    <View style={styles.cardContainer}>
      <Text>
        {name}, watched {ratio}%
      </Text>
    </View>
  )
}

VideoCard.propTypes = {
  name: PropTypes.string.isRequired,
  ratio: PropTypes.string.isRequired,
}

export default VideoCard
