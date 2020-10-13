import React from "react";
import { StyleSheet, View, Text } from "react-native";

function CurrentWeather(props) {
    return (
        <View style={styles.overallContainer}>
            <Text style={styles.text}>{props.city}</Text>
            <Text style={styles.text}>{`${
            (((props.temperature - 32) * 5) / 9) | 0
            } C`}</Text>
            <Text style={styles.text}>{props.summary}</Text>
        </View>
        );
}

const styles = StyleSheet.create({
    overallContainer: {
      flex: 1,
      alignItems: "center",
      backgroundColor: "#87CEEB",
      width: "100%",
      padding: 30,
    },
    text: {
      fontSize: 20,
      color: "white",
    },
  });

export default CurrentWeather;