import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { getFormttedDateTimeFromDate, getDateFromTimestamp, getUVIndexScale } from "../utils/UtilFunctions.js";

function DetailsItem(props) {
    return (
    <View style={styles.detailsContainer}>
        <View style={styles.detailsItemContainer}>
          <Text style={styles.text}>UV Index</Text>
          <Text style={styles.text}>{getUVIndexScale(props.uvIndex)}</Text>
        </View>
        <View style={styles.detailsItemContainer}>
          <Text style={styles.text}>Sunrise</Text>
          <Text style={styles.text}>{getFormttedDateTimeFromDate(getDateFromTimestamp(props.sunrise))}</Text>
        </View>
        <View style={styles.detailsItemContainer}>
          <Text style={styles.text}>Sunset</Text>
          <Text style={styles.text}>{getFormttedDateTimeFromDate(getDateFromTimestamp(props.sunset))}</Text>
        </View>
        <View style={styles.detailsItemContainer}>
          <Text style={styles.text}>Humidity</Text>
          <Text style={styles.text}>{props.humidity}</Text>
        </View>
        <View style={styles.detailsItemContainer}>
          <Text style={styles.text}>Windspeed</Text>
          <Text style={styles.text}>{props.windspeed}</Text>
        </View>
        <View style={styles.detailsItemContainer}>
          <Text style={styles.text}>Visibility</Text>
          <Text style={styles.text}>{props.visibility}</Text>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
    detailsContainer: {
        backgroundColor: "#55CEFF",
        borderRadius: 20
      },
      detailsItemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10
      },
      text: {
        fontSize: 20,
        color: "white",
        padding: 5 
      }
});

export default DetailsItem;