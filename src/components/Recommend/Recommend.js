import React from "react";
import RNPickerSelect from "react-native-picker-select";
import { StyleSheet, Text, View } from "react-native";
export default function Recommend () {
    return (
        <View style={styles.container}>
            <Text>Test Picker</Text>
            <RNPickerSelect
                onValueChange={(value) => console.log(value)}
                items={[
                    { label: "Playlist1", value: "Playlist1" },
                    { label: "Playlist2", value: "Playlist2" },
                    { label: "Playlist3", value: "3" },
                ]}
            />
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