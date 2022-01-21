import { AppBar, Toolbar, Typography, Switch } from "@mui/material";

interface Props {
  darkMode: boolean;
  handleThemeChange: () => void;
}

export default function Header({darkMode, handleThemeChange}: Props) {
  return (
    <AppBar position='static' sx={{ mb: 4 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant='h6'>
          RE-STORE
        </Typography>
        <Switch checked={darkMode} onChange={handleThemeChange} />
      </Toolbar>
    </AppBar>
  )
}