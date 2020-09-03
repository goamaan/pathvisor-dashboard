import React, { useContext, useEffect } from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Checklist from './Checklist/Checklist';
import { UserContext } from '../../../Providers/UserProvider';
import Loading from 'src/components/Loading';
import { useNavigate, Navigate } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  const { user, loading, purchaseNames, purchaseIDS } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      await purchaseIDS;
    };
    loadData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!user && !loading) {
    navigate('/login');
    return null;
  }

  if (purchaseIDS.length === 0) {
    return <Loading />;
  }

  console.log(user, purchaseIDS);

  return (
    <Page className={classes.root} title="Dashboard">
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <Checklist />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
