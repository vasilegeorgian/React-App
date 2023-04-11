# React Weather Application

## Setup and Start

Clone this repo and run `npm install`.

Start the node server for the ReactJS application with `npm start`. The server starts on localhost port 3000.

### Description

This is a weather application that provides real-time weather data for a a given location.
The application is linked to Visual Crossing Weather API (https://www.visualcrossing.com/weather-api).

1. When opened, the application displays current weather data (image based on weather's type, weather type, current, min and max temperatures) and a forecast for the next 7 days (temperature and weather icon), based on the user's current location.

2. The application changes its theme based on whether it is day or night.

3. User can search for weather data in any city via a search bar (current weather data and a forecast for the next 7 days will be displayed for that city).

4. After entering the name of a city into the search bar, user can add that city as a favorite location by clicking the '+' icon.

5. To view their favorite locations, user can click on bars icon, which will open a modal. Inside the modal is displayed a grid of their favorite locations.

6. Each card in the grid contains the name of the favorite location and its current weather data (weather type, current, min and max temperatures).

7. Removing a location from their favorites can be made by clicking the circle-minus icon.

8. Responsive web design.
