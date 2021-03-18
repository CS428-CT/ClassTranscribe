import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styles from './CoursePlaylistContainer.style'
import { FlatList, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { getPlaylistsByOffering } from '../../api/playlists';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

const CoursePlaylistContainer = ({ courseId }) => {
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        const fetchPlaylists = async () => {
            let response = await getPlaylistsByOffering(courseId);
            if (!response)
                return;
            response = response.sort((a, b) => a.index - b.index);
            setPlaylists(response);
        }

        fetchPlaylists();
    });

    const keyExtractor = (item, index) => index.toString()

    const onPlaylistSelected = (playlistId) => {
        console.log("Selected");
    }

    const renderItem = ({ item }) => {
        return (
            <TouchableNativeFeedback 
                onPress={() => onPlaylistSelected(item.id)}
                background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
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
            <FlatList
                keyExtractor={keyExtractor}
                data={playlists}
                renderItem={renderItem}
                />
        </View>
    );
}

CoursePlaylistContainer.propTypes = {
  courseId: PropTypes.string.isRequired,
}

export default CoursePlaylistContainer