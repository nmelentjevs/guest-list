import React, { useState, useEffect } from 'react';

/// Components
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Heading from './Heading';

// Helpers
import { save } from '../helpers/save';
import { reset } from '../helpers/reset';

const Thanks = props => {
  // Component State
  const [timer, setTimer] = useState(5);

  // On mount & unmount
  useEffect(() => {
    if (props.show) {
      setInterval(() => setTimer(timer - 1), 1000);
      return () => {
        if (timer === 1) {
          props.setMockLoading(true);
          save(props);
          reset(props);
        }
      };
    }
  }, [timer, props]);

  // Component View
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.optedin === 'true'
            ? 'Thank you for signing up!'
            : 'Enjoy your day!'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Heading text="Your data is confidential" />
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Button disabled>Reset in: {timer}</Button>
      </Modal.Footer>
    </Modal>
  );
};
export default Thanks;
