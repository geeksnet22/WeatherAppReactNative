import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView, TextBase } from "react-native";
import { SearchBar } from 'react-native-elements';
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { ScrollView } from "react-native-gesture-handler";

function MainWeatherLayout() {
    // raw weather data
    const [rawWeatherData, setRawWeatherData] = useState()
    // current location name
    const [city, setCity] = useState();
  
    useEffect(() => {
      Permissions.askAsync(Permissions.LOCATION).then((json) => 
      { 
        if (json.status === "granted") {
          Location.getCurrentPositionAsync()
          .then((userLocation) => fetch(`https://api.darksky.net/forecast/7d7c4d51abd38384fd51a174d0771a5d/${userLocation.coords.latitude},${userLocation.coords.longitude}`)
          .then(response => response.json() ).then(data => {
            // set weather data
            setRawWeatherData(data);
            Location.reverseGeocodeAsync({latitude: data.latitude, longitude: data.longitude})
            .then((result) => setCity(result[0].city));
          })
          .catch((error) => console.error(error))
          );
        }
      })
    }, []);
  
    _getDateFromTimestamp = (timestamp) => {
      return new Date(timestamp * 1000);
    };
  
    _getFormttedDateTimeFromDate = (date) => {
      var hours = date.getHours()
      var minutes = `${date.getMinutes()}0`
      return `${hours.toString().length < 2 ? `0${hours}` : hours} : ${minutes.toString().length > 2 ? minutes.substring(0,2) : minutes}`;
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
        <Text style={styles.text}>{_getFormttedDateTimeFromDate(_getDateFromTimestamp(time))}</Text>
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
  
    const DetailsItem = ({uvIndex, sunrise, sunset, humidity, windspeed, visibility}) => (
      <View style={styles.detailsContainer}>
        <View style={styles.detailsItemContainer}>
          <Text style={styles.text}>UV Index</Text>
          <Text style={styles.text}>{uvIndex}</Text>
        </View>
        <View style={styles.detailsItemContainer}>
          <Text style={styles.text}>Sunrise</Text>
          <Text style={styles.text}>{sunrise}</Text>
        </View>
        <View style={styles.detailsItemContainer}>
          <Text style={styles.text}>Sunset</Text>
          <Text style={styles.text}>{sunset}</Text>
        </View>
        <View style={styles.detailsItemContainer}>
          <Text style={styles.text}>Humidity</Text>
          <Text style={styles.text}>{humidity}</Text>
        </View>
        <View style={styles.detailsItemContainer}>
          <Text style={styles.text}>Windspeed</Text>
          <Text style={styles.text}>{windspeed}</Text>
        </View>
        <View style={styles.detailsItemContainer}>
          <Text style={styles.text}>Visibility</Text>
          <Text style={styles.text}>{visibility}</Text>
        </View>
      </View>
    )
  
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
          sunrise={_getFormttedDateTimeFromDate(_getDateFromTimestamp(rawWeatherData.daily.data[0].sunriseTime))}
          sunset={_getFormttedDateTimeFromDate(_getDateFromTimestamp(rawWeatherData.daily.data[0].sunsetTime))} 
          humidity={rawWeatherData.currently.humidity} 
          windspeed={rawWeatherData.currently.windSpeed} visibility={rawWeatherData.currently.visibility}/>
        </ScrollView>
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    overallContaianer: {
      flex: 1,
      backgroundColor: "#00CCFF",
      paddingTop: 50,
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
    hourlyItemContainer: {
      alignItems: "center",
      padding: 10
    },
    dailyContainer: {
      backgroundColor: "#55CEFF",
      borderRadius: 20
    },
    dailyItemContainer: {
      padding: 10,
      alignItems: "center"
    },
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
    },
    header: {
      fontSize: 20,
      color: "white",
      paddingVertical: 10
    }
  });

  export default MainWeatherLayout;