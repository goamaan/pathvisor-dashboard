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

  const handleChange = event => {
    // setValues({
    //   ...values,
    //   [event.target.name]: event.target.value
    // });
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
                name="fullName"
                onChange={handleChange}
                required
                value={user.name}
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
                value=""
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <Typography variant="body1" color="initial">
                Countries I am applying to
              </Typography>
              <FormGroup row>
                <FormControlLabel
                  control={<Checkbox checked={false} name="checkedA" />}
                  label="USA"
                />
                <FormControlLabel
                  control={<Checkbox checked={false} name="checkedA" />}
                  label="Canada"
                />
                <FormControlLabel
                  control={<Checkbox checked={false} name="checkedA" />}
                  label="UK"
                />
                <FormControlLabel
                  control={<Checkbox checked={false} name="checkedA" />}
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
