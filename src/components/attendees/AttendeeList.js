import React, { useState, useEffect } from 'react';

/// Helpers
import axios from 'axios';

// Styles
import '../styles/AttendeeListStyles.scss';

// Components
import Attendee from './Attendee';
import FlexCenter from '../common/FlexCenter';
import DefaultInput from '../common/DefaultInput';

// Animations
import { CSSTransition } from 'react-transition-group';

const AttendeeList = ({ history, loadingGuests }) => {
  // Component State
  let [contacts, setContacts] = useState([]);
  let [displayedContacts, setDisplayedContacts] = useState([]);

  // On mount
  useEffect(() => {
    axios.get('/attendees').then(res => {
      setDisplayedContacts(res.data.guestList);
      setContacts(res.data.guestList);
    });

    // Focus on input when confirming email
    const nameForm = document.getElementsByClassName('name-form')[0];
    const input = nameForm.firstChild;
    input.focus();
  }, []);

  // Component Controllers
  const handleSearch = e => {
    let searcjQery = e.target.value.toLowerCase();
    displayedContacts = contacts.filter(el => {
      let searchValue = el.name.toLowerCase();
      return searchValue.indexOf(searcjQery) !== -1;
    });
    if (e.target.value === '') {
      setDisplayedContacts(contacts);
    } else {
      setDisplayedContacts(displayedContacts);
    }
  };

  const confirmAttendance = name => {
    let confirmedList;

    confirmedList = contacts.map(a => {
      if (a.name === name) {
        a.confirmed = true;
      }
      return a;
    });

    setContacts(confirmedList);
  };

  // Component View
  return (
    <FlexCenter classNames="flex-center">
      <CSSTransition in={loadingGuests} timeout={500} classNames="attendees">
        <div className="holder">
          <div className="name-form">
            <DefaultInput
              type="text"
              name="name"
              className="question"
              id="name"
              required
              onChange={e => handleSearch(e)}
              spanText="Click to search your name"
            />
            <ul style={{ padding: 0 }} className="attendee-list">
              {displayedContacts.length > 0 ? (
                displayedContacts.map((el, i) => {
                  return (
                    <Attendee
                      history={history}
                      key={i}
                      name={el.name}
                      email={el.email}
                      confirmed={el.confirmed}
                      confirmAttendance={confirmAttendance}
                    />
                  );
                })
              ) : (
                <span style={{ fontSize: '20px' }}>No entries found</span>
              )}
            </ul>
          </div>
        </div>
      </CSSTransition>
    </FlexCenter>
  );
};

export default AttendeeList;
