import React, { useState } from 'react';
import {
  FormControlLabel,
  Checkbox,
  Input,
  TextField,
  InputAdornment,
  IconButton
} from '@material-ui/core';
import { Edit } from 'react-feather';
import { makeStyles } from '@material-ui/core/styles';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center '
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 500,
    color: 'black',
    fontSize: 30,
    opacity: 1,
    borderBottom: 0,
    '&:before': {
      borderBottom: 0
    }
  },
  disabled: {
    color: 'black',
    borderBottom: 0,
    '&:before': {
      borderBottom: 0
    }
  },
  btnIcons: {
    marginLeft: 10
  },
  display: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

export default function EditableChecklist({
  listItem,
  handleChange,
  handleTextChange,
  handleRemove,
  id
}) {
  const [editMode, setEditMode] = useState(false);
  const [mouseOver, setMouseOver] = useState(false);
  const classes = useStyles();

  const handleMouseOver = event => {
    if (!mouseOver) {
      setMouseOver(true);
    }
  };

  const handleMouseOut = event => {
    if (mouseOver) {
      setMouseOver(false);
    }
  };

  const handleClick = () => {
    setEditMode(true);
    setMouseOver(false);
  };

  return (
    <>
      <div className={classes.container}>
        <FormControlLabel
          control={
            <Checkbox
              checked={listItem.checked}
              onChange={handleChange}
              name={listItem.name}
              className={classes.display}
            />
          }
        />

        <TextField
          name={listItem.name}
          defaultValue={listItem.data}
          margin="normal"
          error={listItem.data === ''}
          onChange={handleTextChange}
          disabled={!editMode}
          className={classes.textField}
          onMouseEnter={handleMouseOver}
          onMouseLeave={handleMouseOut}
          multiline
          InputProps={{
            classes: {
              disabled: classes.disabled
            },
            startAdornment: mouseOver ? (
              <InputAdornment position="start">
                <IconButton onClick={handleClick}>
                  <Edit />
                </IconButton>
              </InputAdornment>
            ) : (
              ''
            )
          }}
        />
      </div>
    </>
  );
}
