import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { defineMethod } from '../../api/base/BaseCollection.methods';
import { Passcodes } from '../../api/passcode/PasscodeCollection';

const PasscodeGenerateModal = ({ show, onClose }) => {
  const [passcode, setPasscode] = useState('');
  const [expiration, setExpiration] = useState('');

  const handleGeneratePasscode = () => {
    const passcodeData = {
      code: passcode,
      expiredAt: expiration,
    };

    defineMethod.callPromise({ collectionName: Passcodes.getCollectionName(), definitionData: passcodeData })
      .then(() => {
        swal('Success', 'Passcode generated successfully', 'success');
        // Reset the form
        setPasscode('');
        onClose();
      })
      .catch((error) => swal('Error', error.message, 'error'));
  };

  return (
    <Modal show={show} onHide={onClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Generate Passcode</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formPasscode">
            <Form.Label>Passcode</Form.Label>
            <Form.Control
              type="text"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Enter passcode"
            />
          </Form.Group>
          <Form.Group controlId="formExpiration">
            <Form.Label>Expiration Time</Form.Label>
            <Form.Control
              type="datetime-local"
              value={expiration}
              onChange={(e) => setExpiration(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleGeneratePasscode}>
          Generate
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

PasscodeGenerateModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default PasscodeGenerateModal;
