import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import agent from '../../app/api/agent';
import { Avatar, TextField, Grid, Box, Typography, Container, Paper }  from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { LoadingButton } from "@mui/lab";
import { toast } from 'react-toastify';

export default function Register() {
  const history = useHistory();
  const {register, handleSubmit, setError, formState: {isSubmitting, errors, isValid}} = useForm({
    mode: 'all'
  });

  function handleApiErrors(errors: any) {
    if (errors) {
      errors.forEach((error: string) => {
        if (error.includes('Password')) {
          setError('password', {message: error});
        }
        else if (error.includes('Email')) {
          setError('email', {message: error});
        }
        else if (error.includes('User')) {
          setError('username', {message: error});
        }
      });
    } 
  }

  return (
    <Container component={Paper} maxWidth='sm' sx={{alignItems: 'center', display: 'flex', flexDirection: 'column', pt: 3, pb: 5}}>
      <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component='h1' variant='h5'>Register</Typography>
      <Box 
        component='form' 
        onSubmit={handleSubmit((data) => 
          agent.Account.register(data)
            .then(() => {
              toast.success('Registration Successful: Ready to Sign In');
              history.push('/login');
            })
            .catch(error => handleApiErrors(error)))} 
        noValidate 
        sx={{ mt: 1 }}>
        <TextField
          margin='normal'
          fullWidth
          label='User Name'
          autoFocus
          {...register('username', {required: 'User Name is Required'})}
          error={!!errors.username}
          helperText={errors?.username?.message}
        />
        <TextField
          margin='normal'
          fullWidth
          label='Email'
          {...register('email', {
            required: 'Email is Required',
            pattern: {
              value: /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
              message: 'Invalid email address'
            }
          })}
          error={!!errors.email}
          helperText={errors?.email?.message}
        />
        <TextField
          margin='normal'
          fullWidth
          label='Password'
          type='password'
          {...register('password', {
            required: 'Password is Required',
            pattern: {
              value: /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
              message: 'Password requirements: at least one lowercase, one uppercase, one number, one special character, and length between 6-10 characters'
            }
          })}
          error={!!errors.password}
          helperText={errors?.password?.message}
        />
        <LoadingButton
          loading={isSubmitting}
          disabled={!isValid}
          type='submit'
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 2 }}>
          Register
        </LoadingButton>
        <Grid container>
          <Grid item>
            <Link to='/login'>
              {`Already have an account? Sign In`}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}