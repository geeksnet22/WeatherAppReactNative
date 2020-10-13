import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import CurrentWeather from "./components/CurrentWeather";

function App() {
  const [location, setLocation] = useState("");

  // current weather data
  const [city, setCity] = useState();
  const [temperature, setTemperature] = useState();
  const [summary, setSummary] = useState();

  // hourly weather data

  _getUserLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      setLocation("permission not granted");
    } else {
      const userLocation = await Location.getCurrentPositionAsync();
      setLocation(userLocation.coords.longitude);
    }
  };
  _getUserLocation();

  useEffect(() => {
    fetch(
      "https://api.darksky.net/forecast/7d7c4d51abd38384fd51a174d0771a5d/37.8267,-122.4233"
    )
      .then((response) => response.json())
      .then((json) => _setWeatherInfo(json))
      .catch((error) => console.error(error));
  }, [])

  _setWeatherInfo = async (json) => {
    console.log(json)
    try {
      let result = await Location.reverseGeocodeAsync({
        latitude: json.latitude,
        longitude: json.longitude,
      });
      setCity(result[0].city);
      setTemperature(json.currently.temperature);
      setSummary(json.currently.summary);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <CurrentWeather city={city} temperature={temperature} summary={summary}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

export default App;
