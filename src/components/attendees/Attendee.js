import React, { useState } from 'react';

/// Helpers

// Styles
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Components
import Avatar from '@material-ui/core/Avatar';
import CheckIcon from '@material-ui/icons/CheckCircle';
import Button from '../common/Button';
const Loader = require('react-loaders').Loader;

const useStyles = makeStyles(theme => ({
  avatar: {
    backgroundColor: red[500]
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  name: {
    paddingLeft: '20px',
    fontSize: '20px',
    width: '50%'
  }
}));

const Attendee = ({ email, name, confirmed, confirmAttendance, history }) => {
  // Component State
  const classes = useStyles();
  const [checked, setChecked] = useState(false);

  // Component Controllers
  const checkAttendance = name => {
    confirmAttendance(name);
    setChecked(true);
    setTimeout(() => setChecked(false), 500);
    setTimeout(() => history.push(`/details/${name}/${email}`), 1000);
  };

  // Component View
  return (
    <li className={classes.flex}>
      <Avatar aria-label="recipe" className={classes.avatar}>
        {name.split('')[0] + name.split(' ')[1][0]}
      </Avatar>
      <span className={classes.name}>{name}</span>
      {checked ? (
        <Loader type="line-scale" active />
      ) : confirmed ? (
        <div className="icon">
          <CheckIcon color="primary" />
        </div>
      ) : (
        <Button
          handleClick={() => checkAttendance(name)}
          classNames="confirm-button"
          text="Confirm"
        />
      )}
    </li>
  );
};

export default Attendee;
