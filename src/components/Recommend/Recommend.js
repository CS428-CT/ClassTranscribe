import React, { useEffect, useState }from "react";
import RNPickerSelect from "react-native-picker-select";
import { StyleSheet, Text, View } from "react-native";
import { getPlaylistsByOffering } from '../../api/playlists'
const Recommend = ({ courseId }) => {
    const [playlists, setPlaylists] = useState([])
    const [selected, setSelected] = useState([])

    useEffect(() => {
        const fetchPlaylists = async () => {
            let response = await getPlaylistsByOffering(courseId)
            if (!response) return
            setPlaylists(response)
        }

        fetchPlaylists()

    }, [courseId, setPlaylists])
    
    /**
     * Function to Render to playlist picker for reccomend video
     */
    const renderPicker = () => {
        const pickItems = playlists.map(item => {
            return { label: item.name, value: item.id};
        });
        console.log("ATTEMTION")
        console.log(pickItems)
        return(
            <RNPickerSelect
                style = {{placeholder:{color:"black"}}}
                placeholder={pickItems[0]}
                onValueChange={(value) => console.log(value)}
                items={pickItems.slice(1)}
            />
        )
    }

    return (
        <View style={styles.container}>
            <Text>Test Picker</Text>
            {renderPicker()}
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