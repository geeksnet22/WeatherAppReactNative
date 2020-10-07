import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import customData from "./data/Data.json";
import * as Location from "expo-location";

function DataFetcher() {
  const [rawData, setRawData] = useState();
  const [city, setCity] = useState();
  const [temperature, setTemperature] = useState();
  const [summary, setSummary] = useState();

  useEffect(() => {
    fetch(
      "https://api.darksky.net/forecast/7d7c4d51abd38384fd51a174d0771a5d/37.8267,-122.4233"
    )
      .then((response) => response.json())
      .then((json) => setRawData(json))
      .then(_setWeatherInfo)
      .catch((error) => console.error(error));
  }, []);

  _setWeatherInfo = () => {
    _getAddressFromLocationCoordinates();
    setTemperature(rawData.currently.temperature);
    setSummary(rawData.currently.summary);
  };

  _getAddressFromLocationCoordinates = async () => {
    try {
      let result = await Location.reverseGeocodeAsync({
        latitude: rawData.latitude,
        longitude: rawData.longitude,
      });
      setCity(result[0].city);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{city}</Text>
      <Text style={styles.text}>{`${
        (((temperature - 32) * 5) / 9) | 0
      } C`}</Text>
      <Text style={styles.text}>{summary}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#87CEEB",
    width: "100%",
    padding: 30,
  },
  text: {
    fontSize: 20,
  },
});

export default DataFetcher;
