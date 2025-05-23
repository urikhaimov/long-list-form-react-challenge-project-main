
import { useState, useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';

const AutocompleteField = ({ label, value, onChange, options, error, helperText }) => {
  const [inputValue, setInputValue] = useState(value || '');

  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  return (
    <Autocomplete
      freeSolo
      options={options}
      value={value || ''}
      inputValue={inputValue}
      onInputChange={(e, newInput) => setInputValue(newInput)}
      onChange={(e, newValue) => onChange(newValue || '')}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          error={!!error}
          helperText={helperText}
          fullWidth
        />
      )}
    />
  );
};

export default AutocompleteField;
