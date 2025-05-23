



import React, { useMemo, useState } from 'react';
import {
  Typography, Button, Box, Snackbar, Alert, TextField, CircularProgress
} from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import UserRow from '../users/userRow/UserRow';

// Replace with your mock API base URL
const API_BASE = 'https://jsonplaceholder.typicode.com'; // or use your own mock API

const fetchUsers = async () => {
 const res = await fetch(`${API_BASE}/users`);

  const data = await res.json();
  return data.slice(0, 5).map((u) => ({
    id: u.id,
    name: u.name || '',
    email: u.email || '',
    phone: u.phone || '',
    country: u.address?.city || ''
  }));
};

const patchUsers = async (users) => {
  // simulate a patch request
  await new Promise((res) => setTimeout(res, 1000));
  return users;
};

const UsersPage = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [saved, setSaved] = useState(false);

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers
  });

  const mutation = useMutation({
    mutationFn: patchUsers,
    onSuccess: () => {
      setSaved(true);
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  });

  const handleUpdate = (updatedUser) => {
    const newUsers = users.map((u) => (u.id === updatedUser.id ? updatedUser : u));
    queryClient.setQueryData(['users'], newUsers);
  };

  const handleDelete = (id) => {
    const newUsers = users.filter((u) => u.id !== id);
    queryClient.setQueryData(['users'], newUsers);
  };

  const handleAdd = () => {
    const newUser = {
      id: Date.now(),
      name: '',
      country: '',
      email: '',
      phone: ''
    };
    const newUsers = [newUser, ...users];
    queryClient.setQueryData(['users'], newUsers);
  };

  const handleSaveAll = () => {
    mutation.mutate(users);
  };

  const filteredUsers = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return users.filter((user) =>
      ['name', 'email', 'phone', 'country'].some(
        (field) => user[field]?.toLowerCase().includes(term)
      )
    );
  }, [users, searchTerm]);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Users ({filteredUsers.length})</Typography>
        <Box display="flex" gap={1}>
          <Button variant="outlined" onClick={handleAdd}>Add User</Button>
          <Button variant="contained" onClick={handleSaveAll} disabled={mutation.isLoading}>
            {mutation.isLoading ? 'Saving...' : 'Save All'}
          </Button>
        </Box>
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
        {filteredUsers.map((user) => (
          <UserRow
            key={user.id}
            user={user}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </Box>

      <Snackbar
        open={saved}
        autoHideDuration={3000}
        onClose={() => setSaved(false)}
      >
        <Alert onClose={() => setSaved(false)} severity="success" sx={{ width: '100%' }}>
          Users saved to mock API!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UsersPage;
