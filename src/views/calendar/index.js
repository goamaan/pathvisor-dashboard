import React, { useContext, useState } from 'react';
import { Container, Grid, makeStyles, Typography } from '@material-ui/core';
import Page from 'src/components/Page';
import { UserContext } from '../../Providers/UserProvider';
import Loading from 'src/components/Loading';
import Spinner from 'react-spinkit';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  header: {
    marginBottom: theme.spacing(2)
  },
  container: {
    position: 'relative',
    paddingBottom: '50%',
    height: 500,
    width: '75%'
  },
  calendar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  }
}));

const Calendar = () => {
  const classes = useStyles();
  const { user, loading, purchaseIDS } = useContext(UserContext);
  const [frameLoad, setFrameLoad] = useState(true);

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
      <Typography variant="h4" color="initial" className={classes.header}>
        Your Calendar
      </Typography>
      <Typography variant="subtitle1" color="initial">
        Events/Deadlines added by PathVisor are visible here
      </Typography>
      <Typography variant="caption" color="initial" className={classes.header}>
        You can add your own by accepting the invitation sent on your email
      </Typography>
      {frameLoad && (
        <Spinner
          className="loading text-center"
          name="circle"
          color="black"
          fadeIn="none"
          style={{ marginTop: '2em' }}
        />
      )}
      <div className={classes.container}>
        <iframe
          src={user.calendar}
          style={{ border: 0 }}
          width="800"
          height="600"
          frameborder="0"
          scrolling="yes"
          className={classes.calendar}
          onLoad={() => setFrameLoad(false)}
        ></iframe>
      </div>
    </Page>
  );
};

export default Calendar;
