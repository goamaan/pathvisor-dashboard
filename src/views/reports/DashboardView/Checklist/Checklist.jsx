import React, { useState, useContext } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Box,
  IconButton,
  TextField,
  Input
} from '@material-ui/core';
import useStyles from './styles';
import defaultChecklist from '../../../../defaultChecklist.json';
import { UserContext } from 'src/Providers/UserProvider';
import AddCircleIcon from '@material-ui/icons/AddCircle';

export default function Checklist() {
  const classes = useStyles();
  const { user } = useContext(UserContext);

  const [checked, setChecked] = useState(
    user.list || [
      { name: 'item-1', checked: false, data: '' },
      { name: 'item-2', checked: false, data: '' },
      { name: 'item-3', checked: false, data: '' }
    ]
  );

  const handleChange = event => {
    const index = checked.findIndex(e => e.name === event.target.name);
    let newArray = [...checked];
    newArray[index] = { ...newArray[index], checked: event.target.checked };
    setChecked(newArray);
  };

  const handleTextChange = event => {
    const index = checked.findIndex(e => e.name === event.target.name);
    let newArray = [...checked];
    newArray[index] = { ...newArray[index], data: event.target.value };
    setChecked(newArray);
  };

  return (
    <Card className={classes.card}>
      <CardHeader title="Checklist" />
      <Divider />
      <CardContent className={classes.content}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Task</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <FormGroup>
              {checked.map((listItem, i) => (
                <TableRow hover>
                  <TableCell>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={listItem.checked}
                          onChange={handleChange}
                          name={listItem.name}
                        />
                      }
                    />
                    <Input
                      id="component-simple"
                      value={listItem.data}
                      disableUnderline
                      name={listItem.name}
                      onChange={handleTextChange}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </FormGroup>
            <Box display="flex" justifyContent="center">
              <IconButton aria-label="add-item">
                <AddCircleIcon />
              </IconButton>
            </Box>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
