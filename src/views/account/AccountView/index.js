import React, { useContext } from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Profile from './Profile';
import ProfileDetails from './ProfileDetails';
import { UserContext } from '../../../Providers/UserProvider';
import Loading from 'src/components/Loading';
import { useNavigate, Navigate } from 'react-router';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Account = () => {
  const classes = useStyles();
  const { user, loading, purchaseIDS } = useContext(UserContext);

  if (loading) {
    return <Loading />;
  }

  if (!user && !loading) {
    window.location.href = 'https://dashboard.yourpathvisor.com/login';
    return null;
  }

  if (purchaseIDS.length === 0 && !loading) {
    window.location.href = 'https://dashboard.yourpathvisor.com/404';
    return null;
  }

  return (
    <Page className={classes.root} title="Account">
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item lg={4} md={6} xs={12}>
            <Profile />
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <ProfileDetails />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Account;
