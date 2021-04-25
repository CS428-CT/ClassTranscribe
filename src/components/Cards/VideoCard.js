import React from 'react'
import { Text, View } from 'react-native'
import styles from './VideoCard.style'

const VideoCard = ({name, ratio}) => {
    return(
        <View style={styles.cardContainer}>
            <Text>{name}, watched {ratio}%</Text>
        </View>
    )
}

export default VideoCard