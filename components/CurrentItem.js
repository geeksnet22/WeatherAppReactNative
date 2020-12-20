import React from "react";
import { StyleSheet, Text, View } from "react-native";

function CurrentItem(props) {
    return (
    <View style={styles.currentContainer}>
        <Text style={styles.text}>{props.city}</Text>
        <Text style={styles.temperatureText}>{`${props.temperature | 0} C`}</Text>
        <Text style={styles.text}>{props.summary}</Text>
    </View>)
}

const styles = StyleSheet.create({
    currentContainer: {
        alignItems: "center",
        padding: 20
    },
    text: {
        fontSize: 20,
        color: "white",
        padding: 5 
    },
    temperatureText: {
        fontSize: 40,
        color: "white",
        padding: 5
    }
});

export default CurrentItem;