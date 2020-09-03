import React, { useEffect, useContext } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles,
  ListItem,
  Link
} from '@material-ui/core';
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon,
  SkipBack,
  File
} from 'react-feather';
import NavItem from './NavItem';
import { UserContext } from '../../../Providers/UserProvider';
import useStyles from './styles';

const items = [
  {
    href: '/home',
    icon: BarChartIcon,
    title: 'Dashboard'
  },
  {
    href: '/profile',
    icon: UserIcon,
    title: 'Profile'
  }
];

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const { user, loading } = useContext(UserContext);

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);
  let content;

  if (loading) {
    content = (
      <Box height="100%" display="flex" flexDirection="column">
        <Divider />
        <Box p={2}>
          <List>
            {items.map(item => (
              <NavItem
                href={item.href}
                key={item.title}
                title={item.title}
                icon={item.icon}
              />
            ))}
          </List>
          <ListItem className={classes.item} disableGutters>
            <Button
              activeClassName={classes.active}
              className={classes.button}
              disabled
            >
              <File className={classes.icon} size="20" />
              <span className={classes.title}>File Upload (Coming soon)</span>
            </Button>
          </ListItem>
          <ListItem className={classes.item} disableGutters>
            <Button
              activeClassName={classes.active}
              className={classes.button}
              href="https://www.yourpathvisor.com"
            >
              <SkipBack className={classes.icon} size="20" />
              <span className={classes.title}>Back to Home </span>
            </Button>
          </ListItem>
        </Box>
        <Box flexGrow={1} />
      </Box>
    );
  }

  if (!loading && user) {
    content = (
      <Box height="100%" display="flex" flexDirection="column">
        <Box alignItems="center" display="flex" flexDirection="column" p={2}>
          <Typography className={classes.name} color="textPrimary" variant="h5">
            {user.name}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            Student
          </Typography>
        </Box>
        <Divider />
        <Box p={2}>
          <List>
            {items.map(item => (
              <NavItem
                href={item.href}
                key={item.title}
                title={item.title}
                icon={item.icon}
              />
            ))}
            <ListItem className={classes.item} disableGutters>
              <Button
                activeClassName={classes.active}
                className={classes.button}
                disabled
              >
                <File className={classes.icon} size="20" />
                <span className={classes.title}>File Upload (Coming soon)</span>
              </Button>
            </ListItem>
            <ListItem className={classes.item} disableGutters>
              <Button
                activeClassName={classes.active}
                className={classes.button}
                href="https://www.yourpathvisor.com"
              >
                <SkipBack className={classes.icon} size="20" />
                <span className={classes.title}>Back to Home </span>
              </Button>
            </ListItem>
          </List>
        </Box>
        <Box flexGrow={1} />
      </Box>
    );
  }

  if (!user) {
    return (
      <>
        <Hidden lgUp>
          <Drawer
            anchor="left"
            classes={{ paper: classes.mobileDrawer }}
            onClose={onMobileClose}
            open={openMobile}
            variant="temporary"
          >
            {content}
          </Drawer>
        </Hidden>
        <Hidden mdDown>
          <Drawer
            anchor="left"
            classes={{ paper: classes.desktopDrawer }}
            open
            variant="persistent"
          >
            {content}
          </Drawer>
        </Hidden>
      </>
    );
  }

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default NavBar;
