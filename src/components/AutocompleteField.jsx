
import React from 'react';
import { Autocomplete, TextField } from '@mui/material';

const AutocompleteField = ({ label, value, onChange, options, error, helperText }) => {
  return (
    <Autocomplete
      freeSolo
      options={options}
      value={value || ''}
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
