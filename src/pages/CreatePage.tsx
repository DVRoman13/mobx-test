import { Alert, Box, Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { useUsers } from '../store/store.ts';
import { useNavigate } from 'react-router-dom';

const CreatePage: React.FC = () => {
  const { users, addUser } = useUsers();

  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      website: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .matches(/^[A-Za-z0-9@\-_,.']+$/i, 'Please use valid characters: A-Z, a-z, 0-9, @- _.,')
        .email('Please enter a valid email address')
        .required('Please enter your email address'),
      name: Yup.string()
        .required('Please enter your name')
        .min(2, 'Please use between 2 and 50 characters')
        .max(50, 'Please use between 2 and 50 characters'),
      website: Yup.string().matches(
        /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+(\S*)$/,
        'Please enter valid website name',
      ),
    }),

    onSubmit: values => {
      const user = {
        id: users.length + 1,
        username: values.name,
        email: values.email,
        website: values.website,
      };
      addUser(user);
      setIsSuccess(true);
    },
  });

  return (
    <Box>
      <Typography
        variant="h3"
        sx={{ textAlign: 'center', margin: '20px 0' }}
      >
        Create User
      </Typography>

      {isSuccess ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Alert
            severity="success"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              maxWidth: '600px',
              width: '100%',
              margin: '0 auto',
            }}
          >
            User successfully add :-)
          </Alert>
          <Button
            size="large"
            sx={{ padding: '10px', border: '1px solid #1976d2', marginTop: '20px' }}
            onClick={() => {
              navigate('/');
            }}
          >
            Home Page
          </Button>
        </Box>
      ) : (
        <form
          onSubmit={formik.handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '600px',
            width: '100%',
            gap: '20xp',
            margin: '0 auto',
          }}
        >
          <TextField
            error={!!formik.errors.name}
            onChange={formik.handleChange}
            value={formik.values.name}
            label="Name"
            name="name"
            variant="outlined"
            helperText={formik.errors.name}
            sx={{ marginBottom: '20px' }}
          />
          <TextField
            error={!!formik.errors.email}
            onChange={formik.handleChange}
            value={formik.values.email}
            name="email"
            label="Email"
            helperText={formik.errors.email}
            variant="outlined"
            sx={{ marginBottom: '20px' }}
          />
          <TextField
            error={!!formik.errors.website}
            onChange={formik.handleChange}
            value={formik.values.website}
            helperText={formik.errors.website}
            label="Website"
            variant="outlined"
            name="website"
            sx={{ marginBottom: '20px' }}
          />
          <Button
            size="medium"
            type={'submit'}
            sx={{ padding: '10px', border: '1px solid #1976d2' }}
          >
            Save
          </Button>
        </form>
      )}
    </Box>
  );
};

export default CreatePage;
