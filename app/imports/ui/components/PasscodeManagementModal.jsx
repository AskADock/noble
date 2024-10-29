import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { removeItMethod, updateMethod } from '../../api/base/BaseCollection.methods';
import { Passcodes } from '../../api/passcode/PasscodeCollection';

const PasscodeManagementModal = ({ show, action, passcode, onClose }) => {
  const [updatedPasscode, setUpdatedPasscode] = useState(passcode);

  useEffect(() => {
    setUpdatedPasscode(passcode);
  }, [passcode]);

  const handleSaveChanges = () => {
    const collectionName = Passcodes.getCollectionName();

    if (action === 'delete') {
      removeItMethod.callPromise({ collectionName, instance: passcode._id })
        .then(() => {
          swal('Success', 'Passcode deleted successfully', 'success');
          onClose();
        })
        .catch((error) => swal('Error', error.message, 'error'));
    } else if (action === 'edit') {
      const passcodeData = {
        id: passcode._id,
        code: updatedPasscode.code,
        expiredAt: updatedPasscode.expiredAt,
        expired: updatedPasscode.expired,
      };

      updateMethod.callPromise({ collectionName, updateData: passcodeData })
        .then(() => {
          swal('Success', 'Passcode updated successfully', 'success');
          onClose();
        })
        .catch((error) => swal('Error', error.message, 'error'));
    }
  };

  return (
    <Modal show={show} onHide={onClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{action === 'delete' ? 'Delete Passcode' : 'Edit Passcode'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {action === 'delete' ? (
          <>
            <h5>Are you sure you want to delete this passcode?</h5>
            <p>{passcode.code}</p>
          </>
        ) : (
          <Form>
            <Form.Group controlId="formPasscode">
              <Form.Label>Passcode</Form.Label>
              <Form.Control
                type="text"
                value={updatedPasscode.code}
                onChange={(e) => setUpdatedPasscode({ ...updatedPasscode, code: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formExpiredAt">
              <Form.Label>Expires At</Form.Label>
              <Form.Control
                type="datetime-local"
                value={updatedPasscode.expiredAt ? new Date(updatedPasscode.expiredAt).toISOString().slice(0, 16) : ''}
                onChange={(e) => setUpdatedPasscode({ ...updatedPasscode, expiredAt: new Date(e.target.value) })}
              />
            </Form.Group>
            <Form.Group controlId="formExpired">
              <Form.Check
                type="checkbox"
                label="Expired"
                checked={updatedPasscode.expired}
                onChange={(e) => setUpdatedPasscode({ ...updatedPasscode, expired: e.target.checked })}
              />
            </Form.Group>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveChanges}>
          {action === 'delete' ? 'Delete' : 'Save Changes'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

PasscodeManagementModal.propTypes = {
  show: PropTypes.bool.isRequired,
  action: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  passcode: PropTypes.shape({
    _id: PropTypes.string,
    code: PropTypes.string,
    createdAt: PropTypes.instanceOf(Date),
    expiredAt: PropTypes.instanceOf(Date),
    expired: PropTypes.bool,
  }),
};

PasscodeManagementModal.defaultProps = {
  action: '',
  passcode: {},
};

export default PasscodeManagementModal;
