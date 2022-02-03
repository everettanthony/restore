import { useHistory, useLocation } from "react-router-dom";
import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { Fragment } from "react";


export default function ServerError() {
  const history = useHistory();
  const { state } = useLocation<any>();

  return (
    <Container component={Paper} sx={{py: 2}}>
      {state?.error ? (
        <Fragment>
          <Typography variant='h3' color='error' gutterBottom sx={{mb: 0}}>Server Error</Typography>
          <Divider sx={{my: 1}} />
          <Typography>{state.error.detail || 'Internal Server Error'}</Typography>
        </Fragment>
      ) : (
        <Typography variant='h5' gutterBottom>Server Error</Typography>
      )}
      <Button onClick={() => history.push('/catalog')} sx={{mt: 2}}>Return to Catalog</Button>
    </Container>
  )
}