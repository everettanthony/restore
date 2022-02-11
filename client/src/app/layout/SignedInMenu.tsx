import { Fragment, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../store/configureStore';
import { signOut } from '../../features/account/accountSlice';
import { Button, Fade, Menu, MenuItem } from "@mui/material";
import { clearBasket } from '../../features/basket/basketSlice';

export default function SignedInMenu() {
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state => state.account);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <Button 
        color='inherit'
        sx={{typography: 'h6'}}
        onClick={handleClick}>
        {user?.email}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}>
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My Orders</MenuItem>
        <MenuItem onClick={() => {
          dispatch(signOut());
          dispatch(clearBasket());
        }}>Logout</MenuItem>
      </Menu>
    </Fragment>
  );
}