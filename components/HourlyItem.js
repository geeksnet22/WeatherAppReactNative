import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { getFormttedDateTimeFromDate, getDateFromTimestamp } from "../utils/UtilFunctions.js";

function HourlyItem(props) {
    return (
    <View style={styles.hourlyItemContainer}>
        <Text style={styles.text}>{getFormttedDateTimeFromDate(getDateFromTimestamp(props.time))}</Text>
        <Text style={styles.text}>{props.temperature | 0 } C</Text>
        <Text style={styles.text}>{props.summary}</Text>
    </View>
    )
}

const styles = StyleSheet.create({
      hourlyItemContainer: {
        alignItems: "center",
        padding: 10
      },
      text: {
        fontSize: 20,
        color: "white",
        padding: 5 
      },
});

export default HourlyItem;