import React, { useState ,useEffect} from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import citiesData from '../resources/city.list.json'
import './WeatherApp.css';

const MatCityAutocomplete = () => {
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null); // Track selected option
  
    const CHUNK_SIZE = 100; // Define the chunk size
  
    useEffect(() => {
      setOptions(citiesData.slice(0, CHUNK_SIZE));
    }, []);
  
    const handleInputChange = (event, newInputValue) => {
      setInputValue(newInputValue);
      filterCities(newInputValue);
    };
  
    const filterCities = (input) => {
      const filteredCities = citiesData.filter((city) => {
        return city.name && city.name.toLowerCase().includes(input.toLowerCase());
      });
      setOptions(filteredCities.slice(0, CHUNK_SIZE));
    };
  
    return (
    <div class="autocomplete">
      <Autocomplete
        value={selectedOption} // Use selected option for value
        onChange={(event, newValue) => {
          setSelectedOption(newValue); // Set selected option
          setInputValue(newValue?.name || ''); // Update input value with selected option name
        }}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        options={options}
        getOptionLabel={(option) => (option ? option.name || '' : '')}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Check city availability and input it in the box below"
            variant="outlined"
            InputProps={{ ...params.InputProps, autoComplete: 'off' }}
          />
        )}
      />
    </div>
    );
  };
  
  

export default MatCityAutocomplete;
