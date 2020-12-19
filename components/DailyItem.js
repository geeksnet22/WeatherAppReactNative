import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { getDayNameFromDayNumber, getDateFromTimestamp } from "../utils/UtilFunctions.js";

function DailyItem(props) {
    return (
    <View style={styles.dailyItemContainer}>
        <Text style={styles.text}>{getDayNameFromDayNumber(getDateFromTimestamp(props.time).getDay())}</Text>
        <Text style={styles.text}>{`${props.temperatureLow | 0} C to ${props.temperatureHigh | 0} C`}</Text>
    </View>
    )
}

const styles = StyleSheet.create({
      dailyItemContainer: {
        padding: 10,
        alignItems: "center"
      },
      text: {
        fontSize: 20,
        color: "white",
        padding: 5 
      },
});

export default DailyItem;