import { FieldValues, useForm } from 'react-hook-form';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Avatar, TextField, Grid, Box, Typography, Container, Paper }  from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { LoadingButton } from "@mui/lab";
import { useAppDispatch } from '../../app/store/configureStore';
import { signInUser } from './accountSlice';

export default function Login() {
  const history = useHistory();
  const location = useLocation<any>();
  const dispatch = useAppDispatch();
  const {register, handleSubmit, formState: {isSubmitting, errors, isValid}} = useForm({
    mode: 'all'
  });

  async function submitForm(data: FieldValues) {
    try {
      await dispatch(signInUser(data));
      history.push(location.state?.from?.pathname || '/catalog');
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <Container component={Paper} maxWidth='sm' sx={{alignItems: 'center', display: 'flex', flexDirection: 'column', pt: 3, pb: 5}}>
      <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component='h1' variant='h5'>Sign In</Typography>
      <Box component='form' onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 1 }}>
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
          label='Password'
          type='password'
          {...register('password', {required: 'Password is Required'})}
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
          Sign In
        </LoadingButton>
        <Grid container>
          <Grid item>
            <Link to='/register'>
              {`Don't have an account? Sign Up`}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}