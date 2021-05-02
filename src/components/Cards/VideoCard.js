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
<<<<<<< HEAD
      <Text style={styles.leftText}>{name}</Text>
      <Text style={styles.rightText}>watched {ratio}%</Text>
=======
      <Text style={styles.videoName}>{name}</Text>
      <Text style={styles.ratio}>{ratio}%</Text>
>>>>>>> fd3b230ae4615fb26c27889629767157dae4d478
    </View>
  )
}

VideoCard.propTypes = {
  name: PropTypes.string.isRequired,
  ratio: PropTypes.string.isRequired,
}

export default VideoCard
