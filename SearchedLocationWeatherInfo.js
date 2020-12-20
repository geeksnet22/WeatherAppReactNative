import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView, ScrollView } from "react-native";
import * as Location from "expo-location";
import CurrentItem from "./components/CurrentItem.js";
import HourlyItem from "./components/HourlyItem.js";
import DailyItem from "./components/DailyItem.js";
import DetailsItem from "./components/DetailsItem.js";
import { getCoordinatesFromLocationName } from "./utils/UtilFunctions.js";

function SearchedLocationWeatherInfo(props) {
    // raw weather data
    const [rawWeatherData, setRawWeatherData] = useState()
    // current location name
    const [city, setCity] = useState();
  
    useEffect(() => {
          // const { lat, lng } = getCoordinatesFromLocationName("props.location");
          const { lat, lng } = {lat: 51.049999, lng: -114.066666}
          fetch(`https://api.darksky.net/forecast/7d7c4d51abd38384fd51a174d0771a5d/${lat},${lng}?units=ca`)
          .then(response => response.json() ).then(data => {
            // set weather data
            setRawWeatherData(data);
            Location.reverseGeocodeAsync({latitude: data.latitude, longitude: data.longitude})
            .then((result) => setCity(result[0].city));
          })
          .catch((error) => console.error(error))
    }, []);

    if (rawWeatherData === undefined) {
      return <View />
    }
    else {
      return (
        <View style={styles.overallContaianer}>
          <ScrollView style={{paddingHorizontal: 10}}>
            <CurrentItem city={city} temperature={rawWeatherData.currently.temperature} 
            summary={rawWeatherData.currently.summary}/>
            <Text style={styles.header}>Hourly</Text>
            <SafeAreaView style={styles.hourlyContainer}>
              <FlatList horizontal={true} data={rawWeatherData.hourly.data}
                renderItem={({item}) => (
                    <HourlyItem time={item.time} temperature={item.temperature} summary={item.summary} />
                )}
                keyExtractor={item => item.time.toString()}/>
            </SafeAreaView>
            <Text style={styles.header}>Daily</Text>
            <SafeAreaView style={styles.dailyContainer}>
              <FlatList horizontal={true} data={rawWeatherData.daily.data}
                renderItem={({item}) => (
                    <DailyItem time={item.time} temperatureLow={item.temperatureLow} 
                    temperatureHigh={item.temperatureHigh} />
                )}
                keyExtractor={item => item.time.toString()}/>
            </SafeAreaView>
            <Text style={styles.header}>Details</Text>
            <DetailsItem uvIndex={rawWeatherData.currently.uvIndex}
            sunrise={rawWeatherData.daily.data[0].sunriseTime}
            sunset={rawWeatherData.daily.data[0].sunsetTime} 
            humidity={`${rawWeatherData.currently.humidity * 100 | 0} %`} 
            windspeed={`${rawWeatherData.currently.windSpeed | 0} kph`} visibility={`${rawWeatherData.currently.visibility | 0} kms`}/>
        </ScrollView>
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    overallContaianer: {
      flex: 1,
      backgroundColor: "#00CCFF",
      paddingBottom: 10
    },
    currentContainer: {
      alignItems: "center",
      padding: 20
    },
    hourlyContainer: {
      backgroundColor: "#55CEFF",
      borderRadius: 20
    },
    dailyContainer: {
      backgroundColor: "#55CEFF",
      borderRadius: 20
    },
    text: {
      fontSize: 20,
      color: "white",
      padding: 5 
    },
    header: {
      fontSize: 20,
      color: "white",
      paddingVertical: 10
    }
  });

  export default SearchedLocationWeatherInfo;