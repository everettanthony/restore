import { useAppSelector } from "../store/configureStore";
import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Toolbar, Typography, Switch, List, ListItem, IconButton, Badge, Box } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import SignedInMenu from "./SignedInMenu";

interface Props {
  darkMode: boolean;
  handleThemeChange: () => void;
}

const midLinks = [
  { title: 'catalog', path: '/catalog' },
  { title: 'about', path: '/about' },
  { title: 'contact', path: '/contact' }
]

const rightLinks = [
  { title: 'login', path: '/login' },
  { title: 'register', path: '/register' }
]

const navStyles = {
  color: 'inherit', 
  textDecoration: 'none',
  typography: 'h6',
  transition: 'color 200ms ease-in-out',
  '&:hover': {
    color: '#c0defd'
  },
  '&.active': {
    color: '#a0cfff'
  }
}

export default function Header({darkMode, handleThemeChange}: Props) {
  const {basket} = useAppSelector(state => state.basket);
  const {user} = useAppSelector(state => state.account);
  const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AppBar position='static'>
      <Toolbar sx={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
        <Box alignItems='center' display='flex'>
          <Typography 
            variant='h6' 
            component={NavLink} 
            to='/' 
            exact
            sx={navStyles}>
            RE-STORE
          </Typography>
          <Switch checked={darkMode} onChange={handleThemeChange} />         
        </Box>

        <Box>
          <List sx={{display: 'flex'}}>
            {midLinks.map(({title, path}) => (
              <ListItem
                component={NavLink}
                to={path}
                key={path}
                sx={navStyles}>
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
        </Box>

        <Box alignItems='center' display='flex'>
          <IconButton component={Link} to='/basket' size='large' sx={{color: 'inherit'}}>
            <Badge badgeContent={itemCount} color='secondary'>
              <ShoppingCart />
            </Badge>
          </IconButton>

          {user ? (<SignedInMenu />) : (
            <List sx={{display: 'flex', marginLeft: 'auto'}}>
              {rightLinks.map(({title, path}) => (
                <ListItem
                  component={NavLink}
                  to={path}
                  key={path}
                  sx={navStyles}>
                  {title.toUpperCase()}
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}