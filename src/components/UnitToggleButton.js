import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function UnitToggleButton({ onToggle }) {
  const [alignment, setAlignment] = React.useState('Kelvin');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    onToggle(newAlignment);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="Kelvin">Kelvin</ToggleButton>
      <ToggleButton value="Celsius">Celsius</ToggleButton>
      <ToggleButton value="Fahrenheit">Fahrenheit</ToggleButton>
    </ToggleButtonGroup>
  );
}