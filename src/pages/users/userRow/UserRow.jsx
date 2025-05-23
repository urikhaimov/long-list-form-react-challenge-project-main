
import {useState } from 'react';
import { useForm } from 'react-hook-form';
import {  TextField, IconButton, Box, Button, Snackbar, Alert  } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AutocompleteField from '../../../components/AutocompleteField';

const countryOptions = ["Israel", "China", "Ukraine", "Canada", "Brazil", "France", "Japan"];

const UserRow = ({ user, onUpdate, onDelete }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty, isValid }
  } = useForm({
    defaultValues: user,
    mode: 'onBlur'
  });

  const [open, setOpen] = useState(false);

  const onSave = handleSubmit((data) => {
    if (typeof onUpdate === 'function') {
      onUpdate({ ...user, ...data });
      setOpen(true);
    }
  });

  return (
    <form>
      <Box
        display="flex"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="space-between"
        gap={2}
        p={2}
        borderRadius={2}
        bgcolor="#f9f9f9"
        sx={{ width: '100%', minHeight: 180, boxSizing: 'border-box' }}
      >
        <TextField
          label="Name"
          {...register('name', { required: 'Name is required' })}
          error={!!errors.name}
          helperText={errors.name?.message}
          fullWidth
        />
        <AutocompleteField
          label="Country"
          value={user.country}
          onChange={(val) => setValue('country', val, { shouldValidate: true })}
          options={countryOptions}
          error={!!errors.country}
          helperText={errors.country?.message}
        />
        <TextField
          label="Email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Invalid email address'
            }
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
          fullWidth
        />
        <TextField
          label="Phone"
          {...register('phone', {
            required: 'Phone is required',
            validate: value => value.startsWith('+') || 'Phone must start with +'
          })}
          error={!!errors.phone}
          helperText={errors.phone?.message}
          fullWidth
        />

        <Box display="flex" alignItems="center" gap={2}>
          <Button
            variant="contained"
            onClick={onSave}
            disabled={!isDirty || !isValid}
          >
            Save
          </Button>
          <IconButton
            onClick={() => onDelete(user.id)}
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        </Box>

        {(Object.keys(errors).length > 0) && (
          <Box color="error.main" mt={1}>
            Validation Errors: {Object.keys(errors).join(', ')}
          </Box>
        )}
      </Box>

      <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: '100%' }}>
          User saved successfully!
        </Alert>
      </Snackbar>
    </form>
  );
};

export default UserRow;
