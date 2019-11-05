import React, { useState, useEffect } from 'react';

/// Helpers
import sendEmail from '../helpers/akkroo_api';
import { validateEmail } from '../helpers/validateEmail';

// Styles
import '../styles/DataCaptureStyles.scss';

// Animations
import { CSSTransition } from 'react-transition-group';

// Components
import Switch from 'react-switch';
import FlexCenter from '../common/FlexCenter';
import ButtonContainer from '../common/ButtonContainer';
import Button from '../common/Button';
import Heading from '../common/Heading';
import Thanks from '../common/Thanks';
import DefaultInput from '../common/DefaultInput';
const Loader = require('react-loaders').Loader;

const DataCapture = ({ match, ...props }) => {
  // Component State
  const [modalShow, setModalShow] = useState(false);
  const [mockLoading, setMockLoading] = useState(false);
  let [page, setPage] = useState(1);
  let [checked, setChecked] = useState(true);
  let [validEmail, setValid] = useState(false);
  let [confirmedEmail, setConfirmedEmail] = useState('');

  // On Mount
  useEffect(() => {
    setValid(validateEmail(match.params.email));

    setConfirmedEmail(match.params.email);

    if (match.params.email === 'undefined') {
      setConfirmedEmail('');
    }

    // Focus on input when confirming email
    const emailForm = document.getElementsByClassName('email-form')[0];
    const input = emailForm.firstChild;
    input.focus();
  }, [match.params.email]);

  // Component Controllers
  const handleToggleChange = () => {
    setChecked(!checked);
  };

  const submitAttendee = () => {
    const { name } = match.params;
    if (checked)
      sendEmail(
        match.params.email === 'undefined'
          ? confirmedEmail
          : match.params.email,
        'Beautiful',
        { templateVars: name }
      );
    setModalShow(true);
  };

  const handlePageChange = page => {
    setPage(page);
  };

  const handleEmailInput = e => {
    setConfirmedEmail(e.target.value);
    setValid(validateEmail(e.target.value));
  };

  // Component View
  return page === 1 ? (
    <FlexCenter classNames="data-capture flex-center">
      <div className="email-form">
        <DefaultInput
          type="text"
          name="name"
          className="question"
          id="name"
          defaultValue={
            match.params.email === 'undefined'
              ? confirmedEmail
              : match.params.email
          }
          onChange={e => handleEmailInput(e)}
          spanText={
            match.params.email === 'undefined'
              ? 'Please enter your email'
              : 'Is your email correct?'
          }
        />
        <ButtonContainer>
          <Button
            handleClick={() => props.history.push('/')}
            classNames="back-button"
            text="Back"
          />
          <Button
            handleClick={() => handlePageChange(2)}
            classNames={`confirm-email-button ${
              !validEmail ? 'incorrect-email' : ''
            }`}
            disabled={!validEmail}
            style={{
              border: !validEmail ? '1px solid red' : '',
              color: !validEmail ? 'red' : '',
              width: 'auto'
            }}
            text={validEmail ? 'Continue' : 'Please enter a correct email'}
          />
        </ButtonContainer>
      </div>
    </FlexCenter>
  ) : !mockLoading ? (
    <FlexCenter classNames="flex-center flex-column">
      <div className="email-receive">
        <Heading
          size="30px"
          fontFamily="Montserrat"
          text="Would you like to recieve updates from us?"
        />
        <Switch
          onChange={handleToggleChange}
          checked={checked}
          onColor="#53D769"
          offColor="#f44336"
        />
        <ButtonContainer>
          <Button
            handleClick={() => handlePageChange(1)}
            classNames="back-button"
            text="Back"
          />
          <Button
            handleClick={() => submitAttendee()}
            classNames="confirm-email-button"
            text="Finish"
          />
          <Thanks
            user={{ name: match.params.name, email: confirmedEmail }}
            show={modalShow}
            onHide={() => setModalShow(false)}
            optedin={checked.toString()}
            history={props.history}
            setMockLoading={setMockLoading}
          />
        </ButtonContainer>
      </div>
    </FlexCenter>
  ) : (
    <CSSTransition
      in={mockLoading}
      timeout={250}
      classNames="salmon"
      unmountOnExit
    >
      <div className="flex-center flex-center-spinner salmon">
        <Loader type="line-scale" active />
      </div>
    </CSSTransition>
  );
};

export default DataCapture;
