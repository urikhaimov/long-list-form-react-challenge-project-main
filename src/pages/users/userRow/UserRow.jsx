
import React from 'react';
import { TextField, IconButton, MenuItem, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const UserRow = ({ user, onChange, onDelete, errors }) => {
  const handleChange = (field) => (e) => {
    onChange(user.id, field, e.target.value);
  };

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      alignItems="flex-start"
      justifyContent="flex-start"
      gap={2}
      mb={2}
      sx={{
        border: errors && Object.keys(errors).length ? '1px solid red' : '1px solid transparent',
        borderRadius: 1,
        padding: 2,
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <TextField
        label="Name"
        value={user.name || ''}
        onChange={handleChange('name')}
        error={!!errors?.name}
        helperText={errors?.name}
        fullWidth
      />
      <TextField
        label="Country"
        value={user.country || ''}
        onChange={handleChange('country')}
        error={!!errors?.country}
        helperText={errors?.country}
        fullWidth
      />
      <TextField
        label="Email"
        value={user.email || ''}
        onChange={handleChange('email')}
        error={!!errors?.email}
        helperText={errors?.email}
        fullWidth
      />
      <TextField
        label="Phone"
        value={user.phone || ''}
        onChange={handleChange('phone')}
        error={!!errors?.phone}
        helperText={errors?.phone}
        fullWidth
      />
      <IconButton onClick={() => onDelete(user.id)} color="error">
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export default React.memo(UserRow);