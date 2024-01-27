import { FC, useEffect } from 'react';
import { useAppContext } from '../../contextApi/AppContext';
import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  homeBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    height: '80vh',
    justifyContent: 'center',
  },
});

const HomePage: FC = () => {
  const classes = useStyles();
  const { disableSwitch, setDisableSwitch } = useAppContext();

  useEffect(() => {
    if (!disableSwitch) setDisableSwitch(true);
    return () => {
      if (disableSwitch) setDisableSwitch(false);
    };
  }, [disableSwitch, setDisableSwitch]);

  return (
    <Box className={classes.homeBox}>
      <Typography variant='h1'> BIENVENIDO A </Typography>
      <Typography variant='h2'> LA BOLSA DE EMPLEO</Typography>
    </Box>
  );
};

export default HomePage;
