import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useNavigate } from 'react-router-dom';
import { Switch } from '@mui/material';
import { useAppContext } from '../../contextApi/AppContext';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  swithcBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

function Header() {
  const classes = useStyles();
  const pages = { names: ['Ciudadanos', 'Vacantes'], routes: ['/ciudadanos', '/vacantes'] };
  const navigate = useNavigate();
  const { switchingStatusUIFramework, setSwitchingStatusUIFramework, disableSwitch } = useAppContext();

  const handleMenuNavigation = (route: string) => {
    navigate(route);
  };

  return (
    <AppBar
      position='static'
      sx={{ backgroundColor: 'rgba(0, 78, 186, 0.12)', color: 'black', paddingTop: 2, paddingBottom: 2 }}
    >
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <ShoppingBagIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant='h6'
            noWrap
            onClick={() => handleMenuNavigation('/')}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            Bolsa de Empleo
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, marginLeft: 4 }}>
            {pages.names.map((page, index) => (
              <Button
                key={page}
                onClick={() => handleMenuNavigation(pages.routes[index])}
                sx={{
                  my: 2,
                  color: 'rgba(0, 0, 0, 0.6)',
                  display: 'block',
                }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box className={classes.swithcBox}>
            <Switch
              checked={switchingStatusUIFramework}
              disabled={disableSwitch}
              onChange={() => setSwitchingStatusUIFramework(!switchingStatusUIFramework)}
            />
            <Typography variant='caption'>{!switchingStatusUIFramework ? 'Material UI' : 'PrimeReact'}</Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
