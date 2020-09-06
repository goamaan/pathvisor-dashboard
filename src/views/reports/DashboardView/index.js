import React, { useContext, useEffect, useState } from 'react';
import { Container, Grid, makeStyles, Typography } from '@material-ui/core';
import Page from 'src/components/Page';
import Checklist from './Checklist/Checklist';
import { UserContext } from '../../../Providers/UserProvider';
import Loading from 'src/components/Loading';
import { useNavigate, Navigate } from 'react-router-dom';
import Notes from './Notes/Notes';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  container: {
    textAlign: 'center'
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  const { user, loading, purchaseIDS, valid } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (purchaseIDS.length === 0 && !loading && user) {
      navigate('/404');
    }
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!user && !loading) {
    navigate('/login');
    return null;
  }

  if (valid === false) {
    return (
      <Page className={classes.root} title="Dashboard">
        <Container maxWidth={false}>
          <Alert severity="error">
            Please fill out your profile to access these features
          </Alert>
        </Container>
      </Page>
    );
  }

  return (
    <>
      <Page className={classes.root} title="Dashboard">
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <Checklist />
            </Grid>
            <Grid item md={6} xs={12}>
              <Notes />
            </Grid>
          </Grid>
        </Container>
      </Page>
    </>
  );
};

export default Dashboard;
