import React, { useState, useContext } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography
} from '@material-ui/core';
import { UserContext } from 'src/Providers/UserProvider';
import Loading from 'src/components/Loading';

const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = ({ className, ...rest }) => {
  const classes = useStyles();
  const { user, loading } = useContext(UserContext);
  const [state, setState] = useState({
    name: user.name,
    course: user.course || '',
    usa: false,
    canada: false,
    uk: false,
    germany: false
  });

  const handleChange = event => {
    console.log(event);
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  const handleChangeCountry = event => {
    console.log(event);
    setState({
      ...state,
      [event.target.name]: event.target.checked
    });
  };

  if (loading) {
    return null;
  }

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify the full name"
                label="Full name"
                name="name"
                onChange={handleChange}
                required
                value={state.name}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                value={user.email}
                variant="outlined"
                disabled
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Course/Degree I want to pursue"
                name="course"
                onChange={handleChange}
                required
                value={state.course}
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <Typography variant="body1" color="initial">
                Countries I am applying to
              </Typography>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={handleChangeCountry}
                      checked={state.usa}
                      name="usa"
                    />
                  }
                  label="USA"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={handleChangeCountry}
                      checked={state.canada}
                      name="canada"
                    />
                  }
                  label="Canada"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={handleChangeCountry}
                      checked={state.uk}
                      name="uk"
                    />
                  }
                  label="UK"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={handleChangeCountry}
                      checked={state.germany}
                      name="germany"
                    />
                  }
                  label="Germany"
                />
              </FormGroup>
            </Grid>
            {/* <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Country"
                name="country"
                onChange={handleChange}
                required
                value={values.country}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Select State"
                name="state"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.state}
                variant="outlined"
              >
                {states.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid> */}
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button color="primary" variant="contained">
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;
