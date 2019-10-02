import React, { useState, useEffect } from 'react';

/// Views
import AttendeeList from './attendees/AttendeeList';

// Mock api
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

// This sets the mock adapter on the default instance
const mock = new MockAdapter(axios);

// Mock any GET request to /attendees
// arguments for reply are (status, data, headers)
mock.onGet('/attendees').reply(200, {
  guestList: [
    {
      name: 'John Jameson',
      confirmed: false
    },
    {
      name: 'Sam Stuarts',
      email: 'sam@stuarts.com',
      confirmed: false
    },
    {
      name: 'Matt Michaels',
      email: 'matt@michaels.com',
      confirmed: false
    }
  ]
});

const MockingMiddleware = props => {
  // Component State
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(true);

  // On mount

  useEffect(() => {
    setLoading(true);
    axios.get('/attendees').then(res => {
      setAttendees(res.data.guestList);
      setLoading(false);
    });
  }, []);

  // Component View
  return (
    <>
      <AttendeeList
        attendees={attendees}
        history={props.history}
        loadingGuests={loading}
      />
    </>
  );
};

export default MockingMiddleware;
