// src/components/WeatherApp.js

import React, { useState } from 'react';
import axios from 'axios';
// import env from '../config/env';

const WeatherApp = () => {
  // State for city input and weather data
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  // Function to handle city input change
  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  // Function to fetch weather data
  const fetchWeatherData = async () => {
    try {
      // Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
      const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

      const response = await axios.get(apiUrl);
      console.debug(response);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  return (
    <div>
      <h1>Weather App</h1>

      {/* Form for entering the city */}
      <form onSubmit={handleSubmit}>
        <label>
          Enter City:&nbsp;
          <input type="text" value={city} onChange={handleCityChange} />
        </label>
        <button type="submit">Get Weather</button>
      </form>

      {/* Display weather information if available */}
      {weatherData && (
        <div>
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
