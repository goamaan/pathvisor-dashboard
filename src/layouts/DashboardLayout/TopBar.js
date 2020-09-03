import React, { useState, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles,
  Tooltip,
  Typography
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import InputIcon from '@material-ui/icons/Input';
import Logo from 'src/components/Logo';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { UserContext } from 'src/Providers/UserProvider';

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    width: 60,
    height: 60
  }
}));

const TopBar = ({ className, onMobileNavOpen, ...rest }) => {
  const classes = useStyles();
  const [notifications] = useState([]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const onLogout = e => {
    e.preventDefault();
    auth.signOut().then(navigate('/login'));
  };

  return (
    <AppBar className={clsx(classes.root, className)} elevation={0} {...rest}>
      <Toolbar>
        <Logo />
        <Box flexGrow={1} />
        {/* <Hidden mdDown> */}
        {user && (
          <>
            <Typography variant="subtitle1" color="initial">
              Log out
            </Typography>
            <IconButton color="inherit" onClick={onLogout}>
              <ExitToAppIcon />
            </IconButton>
          </>
        )}

        {/* </Hidden> */}
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

export default TopBar;
