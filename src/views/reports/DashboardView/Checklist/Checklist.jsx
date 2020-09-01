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
  Checkbox
} from '@material-ui/core';
import useStyles from './styles';
import defaultChecklist from '../../../../defaultChecklist.json';

export default function Checklist({ id }) {
  const classes = useStyles();

  const [checked, setChecked] = useState([
    { name: 'item-1', checked: false },
    { name: 'item-2', checked: false },
    { name: 'item-3', checked: false }
  ]);

  const handleChange = event => {
    const index = checked.findIndex(e => e.name === event.target.name);
    let newArray = [...checked];
    newArray[index] = { ...newArray[index], checked: event.target.checked };
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
                      label={defaultChecklist[id][i]}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </FormGroup>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
