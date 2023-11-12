import React, { useState } from 'react';
import axios from 'axios';
import UnitToggleButton from './UnitToggleButton';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const WeatherApp = () => {
  // State for city input  and weatherdata

  const units_metric_dictionary = {
    Celsius: "Metric",
    Kelvin: "Default",
    Fahrenheit: "Imperial"
  }
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [temperatureUnit, setTemperatureUnit] = useState('Kelvin'); // Initial value
  const [currentMetric, setCurrentMetric] = useState(units_metric_dictionary[temperatureUnit]);
  const [currentUnits, setCurrentUnits] = useState(temperatureUnit);


  // Function to handle city input change
  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  // Function to fetch weather data
  const fetchWeatherData = async () => {
    try {
      // Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
      const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${currentMetric}`;

      const response = await axios.get(apiUrl);
      console.debug(response);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleUnitToggle = (unit) => {
    setCurrentMetric(units_metric_dictionary[unit])
    setTemperatureUnit(unit);
  };


  // Function to handle form submission
  const getCityWeather = (e) => {
    e.preventDefault();
    setCurrentUnits(temperatureUnit);
    fetchWeatherData();
  };

  return (
    <div>
      <h1>Weather App</h1>


      <form onSubmit={getCityWeather} style={{ display: 'flex', gap: '10px' }}>
        <TextField
          label="Enter a City"
          required
          variant="outlined"
          value={city}
          onChange={handleCityChange}
        />
        <Button variant="contained" type="submit">
          Get Weather
        </Button>
      </form>
      <p></p>
      <UnitToggleButton onToggle={handleUnitToggle} />

      {/* Display weather information if available */}
      {weatherData && (
        <div>
          <h3>{weatherData.name}, {weatherData.sys.country}</h3>
          <p>Temperature: {weatherData.main.temp} °{currentUnits.charAt(0)}</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          {weatherData.weather[0].icon && ( 
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
              alt="Weather Icon"
            />
          )}
        </div>
      )}
        <p/>
      <p/>

    </div>
  );
};

export default WeatherApp;
