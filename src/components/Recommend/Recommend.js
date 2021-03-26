import React, { useEffect, useState }from "react";
import RNPickerSelect from "react-native-picker-select";
import { StyleSheet, Text, View } from "react-native";
import { getPlaylistsByOffering } from '../../api/playlists'
import { getVideosByPlaylist } from '../../api/playlists'
const Recommend = ({ courseId }) => {
    const [playlists, setPlaylists] = useState([])
    const [selected, setSelected] = useState(null)
    const [videos, setVideos] = useState([])
    /**
     * Use Effect monitor playlist fetched
     */
    useEffect(() => {
        const fetchPlaylists = async () => {
            let response = await getPlaylistsByOffering(courseId)
            if (!response) return
            setPlaylists(response)
        }
        fetchPlaylists()
    }, [courseId, setPlaylists])
    

    /**
     * Use Effect monitor Selected playlist and fetched corresbonding video
     */
    useEffect(() => {
        const fetchVideos = async () => {
            console.log("CHOOSINGS: ", selected)
            const response = await getVideosByPlaylist(selected)
            if (!response) return
            const indexedVid = response.medias.sort((a, b) => a.index - b.index)
            setVideos(indexedVid)
        }
        if(selected){
            fetchVideos()   
        }
    }, [selected, setVideos])

    /**
     * Function to Render to playlist picker for reccomend video
     */
    const renderPicker = () => {
        const pickItems = playlists.map(item => {
            return { label: item.name, value: item.id};
        });
        // console.log(pickItems[0]["label"])
        if(pickItems.length > 0){
            return(
                <RNPickerSelect
                    style = {{placeholder:{color:"black"}}}
                    placeholder={{
                        label: pickItems[0]["label"], 
                        value: pickItems[0]["value"]
                    }}
                    onValueChange={(value) => setSelected(value)}
                    items={pickItems.slice(1)}
                />
            )
        }
    }

    /**
     * Function to Render recommend video of given playlist
     */
     const renderVideo = () => {
        const pickItems = videos.map(item => {
            // console.log(item.name);
            // console.log(item.watchHistory);
        });
        if(videos.length > 0){
            return(
                <View></View>
            )
        }
    }

    return (
        <View style={styles.container}>
            <Text>Test Picker</Text>
            {renderPicker()}
            {renderVideo()}
        </View>
    );
}
const styles = StyleSheet.create({
    container : {
        flex            : 1,
        backgroundColor : "#fff",
        alignItems      : "center",
        justifyContent  : "center",
    },
});

export default Recommend;