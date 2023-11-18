import React, { useState } from 'react';
import axios from 'axios';
import UnitToggleButton from './UnitToggleButton';
import './WeatherApp.css';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import {TextField, Button, Tooltip, List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider} from '@mui/material';
import './CityAutocomplete'
import MatCityAutocomplete from './MatCityAutocomplete';

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
    <div class='main-div'>
      <h1>Weather App</h1>
      <MatCityAutocomplete/>
      <p/>
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
      <p/>
      <UnitToggleButton onToggle={handleUnitToggle} />
      <p/>
      

    {weatherData && (
      <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
      }}
      >
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <DeviceThermostatIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText>
            <div>
              Current Temperature: {weatherData.main.temp} {currentUnits.charAt(0)==='K'?"":"°"}{currentUnits.charAt(0)}<br/>
              <span class="min-temp">Min Temperature: {weatherData.main.temp_min} {currentUnits.charAt(0)==='K'?"":"°"}{currentUnits.charAt(0)}</span><br/>
              <span class="max-temp">Max Temperature: {weatherData.main.temp_max} {currentUnits.charAt(0)==='K'?"":"°"}{currentUnits.charAt(0)}</span>
            </div>
          </ListItemText>
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <BeachAccessIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText >
            Weather: {weatherData.weather[0].main}
            {weatherData.weather[0].icon && ( 
                <Tooltip title = {weatherData.weather[0].description} placement='right'>
                  <img
                    src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                    alt="Weather Icon"
                  />
                </Tooltip>
              )}
          </ListItemText>
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <WbTwilightIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText >
            {weatherData.sys && ( 
                <div>
                  Sunrise time: {new Date(weatherData.sys.sunrise*1000).getHours()}:{new Date(weatherData.sys.sunrise*1000).getMinutes()}<br/>
                  Sunset time: {new Date(weatherData.sys.sunset*1000).getHours()}:{new Date(weatherData.sys.sunset*1000).getMinutes()}
                </div>
              )}
          </ListItemText>
        </ListItem>
      </List>
    )}
    </div>
  );
};

export default WeatherApp;
