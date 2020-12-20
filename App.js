import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import UserLocationWeatherInfo from "./UserLocationWeatherInfo";
import SearchedLocationWeatherInfo from "./SearchedLocationWeatherInfo";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="User Location" component={UserLocationWeatherInfo} />
        <Stack.Screen name="Searched Location" component={SearchedLocationWeatherInfo} />
      </Stack.Navigator>
    </NavigationContainer>
  )};

export default App;
