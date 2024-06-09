import React, { useEffect }  from 'react';
import { Box, Button, Link, Grid, Container, Typography, TextField, CssBaseline, Avatar, Snackbar} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Layout as AuthLayout } from '../Layouts/auth/layouts';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuthContext } from '../Context/AuthContext';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { passwordRegex } from '../api/auth';

const Page = () => {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState(null);
  const router = useNavigate();
  const authContext = useAuthContext();
  const defaultTheme = createTheme();
  useEffect(() => {
    if (authContext.isAuthenticated) {
      router('/');
    }
  }, [authContext.isAuthenticated, router]);

  const formik = useFormik({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
      firstName: Yup.string().max(255).required('Name is required'),
      lastName: Yup.string().max(255).required('Name is required'),
      password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(
        passwordRegex,
        'Password must contain at least 1 letter, 1 number, and 1 special character'
      ).required('Password is required'),
    }),
    onSubmit: async (values, helpers) => {
      setOpen(true);
      try {
        await authContext.signUp(values.firstName + ' ' + values.lastName,values.email,values.password);
        setOpen(false);
        router('/');
      } catch (err) {
        setOpen(false);
        setError(err.message);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  const handleCloseAlert = () => {
    setError(null);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
             <TextField
                    error={!!(formik.touched.firstName && formik.errors.firstName)}
                    fullWidth
                    helperText={formik.touched.firstName && formik.errors.firstName}
                    label="First Name"
                    name="firstName"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                  />
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField
                    error={!!(formik.touched.lastName && formik.errors.lastName)}
                    fullWidth
                    helperText={formik.touched.lastName && formik.errors.lastName}
                    label="Last Name"
                    name="lastName"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                  />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    error={!!(formik.touched.email && formik.errors.email)}
                    fullWidth
                    helperText={formik.touched.email && formik.errors.email}
                    label="Email Address"
                    name="email"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="email"
                    value={formik.values.email}
                  />
              </Grid>
              <Grid item xs={12}>
              <TextField
                    error={!!(formik.touched.password && formik.errors.password)}
                    fullWidth
                    helperText={formik.touched.password && formik.errors.password}
                    label="Password"
                    name="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="password"
                    value={formik.values.password}
                  />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        message={error}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
    </ThemeProvider>
  );
};

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Page;