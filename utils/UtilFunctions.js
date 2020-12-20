import React from "react";
import Geocode from "react-geocode";

export function getDateFromTimestamp(timestamp) {
    return new Date(timestamp * 1000);
  };

export function getFormttedDateTimeFromDate(date) {
    var hours = date.getHours()
    var minutes = `${date.getMinutes()}0`
    return `${hours.toString().length < 2 ? `0${hours}` : hours}:${minutes.toString().length > 2 ? minutes.substring(0,2) : minutes}`;
  };

export function getDayNameFromDayNumber(dayNumber) {
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

  export function getUVIndexScale(uvIndexValue) {
    if ( uvIndexValue <=2 ) {
        return "Low"
    }
    else if ( uvIndexValue >=3 && uvIndexValue <= 5 ) {
        return "Moderate"
    }
    else if ( uvIndexValue === 6 || uvIndexValue === 7 ) {
        return "High"
    }
    else {
        return "Very High"
    }
  }

  export function getCoordinatesFromLocationName(locationName) {
    Geocode.setApiKey("AIzaSyBL9YKtKQSP373OJS67uXcgsaUXoyv8DBU");
    Geocode.fromAddress("Eiffel Tower").then(
      response => {
        return { lat, lng } = response.results[0].geometry.location;
      },
      error => {
        console.error(error);
      }
    );
  }