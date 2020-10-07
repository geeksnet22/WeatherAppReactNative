import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import DataFethcher from "./utils/DataFetcher";

function App() {
  const [location, setLocation] = useState("");
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
  return (
    <View style={styles.container}>
      <DataFethcher />
      <StatusBar style="auto" />
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
