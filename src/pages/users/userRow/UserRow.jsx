
import React from 'react';
import { TextField, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AutocompleteField from '../../../components/AutocompleteField';
const UserRow = ({ user, onChange, onDelete, errors }) => {
  const handleChange = (field) => (e) => {
    onChange(user.id, field, e.target.value);
  };

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      alignItems="center"
      justifyContent="space-between"
      gap={2}
      p={2}
      width="100%"
      borderRadius={2}
      bgcolor="#f9f9f9"
      sx={{ width: '100%', minHeight: 140, boxSizing: 'border-box' }}
    >
      <TextField
        label="Name"
        value={user.name || ''}
        onChange={handleChange('name')}
        error={!!errors?.name}
        helperText={errors?.name}
        fullWidth
      />
      <Box flex={1} minWidth={250}>
        <AutocompleteField
          label="Country"
          value={user.country || ''}
          onChange={(value) => onChange(user.id, 'country', value)}
          options={["Israel", "China", "Ukraine", "Canada", "Brazil", "Morocco", "France", "Japan"]}
          error={!!errors?.country}
          helperText={errors?.country}
        />
      </Box>
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
      <IconButton
        onClick={() => onDelete(user.id)}
        color="error"
        sx={{ alignSelf: 'flex-start' }}
      >
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export default React.memo(UserRow);
