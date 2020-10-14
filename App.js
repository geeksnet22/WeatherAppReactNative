import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView, TextBase } from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";


function App() {
  const isMountRef = useRef(null)
  // current weather data
  const [city, setCity] = useState();
  const [currentTemperature, setCurrentTemperature] = useState();
  const [currentSummary, setCurrentSummary] = useState();
  // hourly weather data
  const [hourlyData, setHourlyData] = useState();
  // dailt weather data
  const [dailyData, setDailyData] = useState();

  useEffect(() => {
    isMountRef.current = true
    Permissions.askAsync(Permissions.LOCATION).then((json) => { if (json.status === "granted") {
      Location.getCurrentPositionAsync()
    .then((userLocation) => fetch(`https://api.darksky.net/forecast/7d7c4d51abd38384fd51a174d0771a5d/${userLocation.coords.latitude},${userLocation.coords.longitude}`)
    .then((response) => response.json())
    .then((json) => isMountRef.current ? _setWeatherInfo(json) : "")
    .catch((error) => console.error(error)));
    }}
    )
    return () => isMountRef.current = false;
  }, []);


  _setWeatherInfo = async (json) => {
      // set current weather
      Location.reverseGeocodeAsync({latitude: json.latitude, longitude: json.longitude})
      .then((result) => setCity(result[0].city));
      setCurrentTemperature(json.currently.temperature);
      setCurrentSummary(json.currently.summary);
      // set hourly weather
      setHourlyData(json.hourly.data);
      //set dailt weather
      setDailyData(json.daily.data);
  };

  _getDateFromTimestamp = (timestamp) => {
    return new Date(timestamp * 1000);
  };

  _getDayNameFromDayNumber = (dayNumber) => {
    var day = ""
    switch(dayNumber) {
      case 0:
        day = "Sunday"
        break;
      case 1:
        day = "Monday"
        break;
      case 2:
        day = "Tuesday"
        break;
      case 3:
        day = "Wednesday"
        break;
      case 4:
        day = "Thursday"
        break;
      case 5:
        day = "Friday"
        break;
      case 6:
        day = "Saturday"
        break;  
    }
    return day;
  }

  const CurrentItem = ({city, temperature, summary}) => (
    <View style={styles.currentContainer}>
      <Text style={styles.text}>{city}</Text>
      <Text style={styles.text}>{`${
      (((temperature - 32) * 5) / 9) | 0
      } C`}</Text>
      <Text style={styles.text}>{summary}</Text>
    </View>
  )

  const HourlyItem = ({time, temperature, summary}) => (
    <View style={styles.hourlyItemContainer}>
      <Text style={styles.text}>{`${_getDateFromTimestamp(time).getHours()}:${_getDateFromTimestamp(time).getMinutes()}0`}</Text>
      <Text style={styles.text}>{temperature | 0 } C</Text>
      <Text style={styles.text}>{summary}</Text>
    </View>
  );

  const DailyItem = ({time, temperatureLow, temperatureHigh}) => (
    <View style={styles.dailyItemContainer}>
      <Text style={styles.text}>{_getDayNameFromDayNumber(_getDateFromTimestamp(time).getDay())}</Text>
      <Text style={styles.text}>{`${temperatureLow | 0} C to ${temperatureHigh | 0} C`}</Text>
    </View>
  )

  return (
    <View style={styles.overallContaianer}>
      <CurrentItem city={city} temperature={currentTemperature} summary={currentSummary}/>
      <Text style={styles.header}>Hourly</Text>
      <SafeAreaView style={styles.hourlyContainer}>
      <FlatList horizontal={true} data={hourlyData}
        renderItem={({item}) => (
            <HourlyItem time={item.time} temperature={item.temperature} summary={item.summary} />
        )}
        keyExtractor={item => item.time.toString()}/>
    </SafeAreaView>
    <Text style={styles.header}>Daily</Text>
    <SafeAreaView style={styles.dailyContainer}>
      <FlatList horizontal={true} data={dailyData}
        renderItem={({item}) => (
            <DailyItem time={item.time} temperatureLow={item.temperatureLow} temperatureHigh={item.temperatureHigh} />
        )}
        keyExtractor={item => item.time.toString()}/>
    </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  overallContaianer: {
    flex: .8,
    alignItems: "center",
    backgroundColor: "#87cefa",
  },
  currentContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  hourlyContainer: {
    flex: 1.5,
    alignItems: "flex-start",
    backgroundColor: "#87CEEB",
    borderRadius: 20
  },
  hourlyItemContainer: {
    padding: 20,
    alignItems: "center",
    alignSelf: "center",
  },
  dailyContainer: {
    flex: 1.5,
    alignItems: "flex-start",
    backgroundColor: "#87CEEB",
    borderRadius: 20
  },
  dailyItemContainer: {
    padding: 20,
    alignItems: "center",
    alignSelf: "center",
  },
  text: {
    fontSize: 20,
    color: "white",
  },
  header: {
    alignSelf: "flex-start",
    fontSize: 20,
    color: "white"
  }
});

export default App;
