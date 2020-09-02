import React, { useContext, useEffect } from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Budget from './Budget';
import LatestOrders from './LatestOrders';
import LatestProducts from './LatestProducts';
import Sales from './Sales';
import TasksProgress from './TasksProgress';
import TotalCustomers from './TotalCustomers';
import TotalProfit from './TotalProfit';
import TrafficByDevice from './TrafficByDevice';
import Checklist from './Checklist/Checklist';
import { UserContext } from '../../../Providers/UserProvider';
import Loading from 'src/components/Loading';
import { useNavigate } from 'react-router-dom';

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

  if (!user) {
    navigate('/login');
  }

  if (purchaseIDS.length === 0) {
    return <Loading />;
  }

  console.log(user, purchaseIDS);

  return (
    <Page className={classes.root} title="Dashboard">
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          {/* <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Budget />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalCustomers />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TasksProgress />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalProfit />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <Sales />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <TrafficByDevice />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <LatestProducts />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <LatestOrders />
          </Grid> */}
          {purchaseIDS.map(item => (
            <Checklist id={item} />
          ))}
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
