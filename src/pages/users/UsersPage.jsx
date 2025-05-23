
import React, { useState, useCallback, useMemo } from 'react';
import { Typography, Button, Box, TextField } from '@mui/material';
import { useUsersContext } from '../../context/usersContext';
import UserRow from '../users/userRow/UserRow';
import VirtualList from '../../components/VitualList';


const validateUser = (user) => {
  const errors = {};
  if (!user.name?.trim()) errors.name = 'Required';
  if (!user.email?.includes('@')) errors.email = 'Invalid email';
  if (!user.phone?.startsWith('+')) errors.phone = 'Must start with +';
  if (!user.country?.trim()) errors.country = 'Required';
  return errors;
};

const UsersPage = () => {
  const { state, dispatch } = useUsersContext();
  const users = state?.users || [];
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      ['name', 'email', 'phone', 'country'].some((field) =>
        user[field]?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [users, searchTerm]);

  const errorsMap = useMemo(() => {
    const map = {};
    filteredUsers.forEach(user => {
      const errors = validateUser(user);
      if (Object.keys(errors).length > 0) {
        map[user.id] = errors;
      }
    });
    return map;
  }, [filteredUsers]);

  const handleAdd = () => {
    dispatch({ type: 'ADD_USER' });
  };

  const handleFieldChange = useCallback((id, field, value) => {
    dispatch({ type: 'UPDATE_USER_BY_ID', payload: { id, field, value } });
  }, [dispatch]);

  const handleDelete = useCallback((id) => {
    dispatch({ type: 'DELETE_USER_BY_ID', payload: id });
  }, [dispatch]);

  return (
    <Box p={2}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h5">Users ({filteredUsers.length})</Typography>
        <Button variant="contained" onClick={handleAdd}>Add User</Button>
      </Box>

      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Box mt={2}>

        <VirtualList
          users={filteredUsers}
          onFieldChange={handleFieldChange}
          onDelete={handleDelete}
          errorsMap={errorsMap}
        />
      </Box>
    </Box>
  );
};

export default UsersPage;
