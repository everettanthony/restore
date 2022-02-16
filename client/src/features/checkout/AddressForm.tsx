import { useFormContext } from 'react-hook-form';
import { Grid, Typography } from '@mui/material';
import AppTextInput from '../../app/components/AppTextInput';
import AppSelectList from '../../app/components/AppSelectList';
import AppCheckbox from '../../app/components/AppCheckbox';
import { UnitedStatesList } from '../../app/utilities/states';
import { CountriesList } from '../../app/utilities/countries';

export default function AddressForm() {
  const { control, formState } = useFormContext();

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <AppTextInput control={control} name='fullName' label='Full Name' />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput control={control} name='address1' label='Address' />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput control={control} name='address2' label='Address 2' />
        </Grid>
        <Grid item xs={12} sm={3}>
          <AppTextInput control={control} name='city' label='City' />
        </Grid>
        <Grid item xs={12} sm={3}>
          <AppSelectList control={control} name='state' label='State' items={UnitedStatesList} />
        </Grid>
        <Grid item xs={12} sm={3}>
          <AppTextInput control={control} name='zip' label='Zip Code' />
        </Grid>
        <Grid item xs={12} sm={3}>
          <AppSelectList control={control} name='country' label='Country' items={CountriesList} />
        </Grid>
        <Grid item xs={12}>
          <AppCheckbox 
            disabled={!formState.isDirty}
            name='saveAddress' 
            label='Save this as the default address' 
            control={control} />
        </Grid>
      </Grid>
    </>
  );
}