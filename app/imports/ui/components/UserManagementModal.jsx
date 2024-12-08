import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { ExclamationTriangleFill } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { removeItMethod, defineMethod } from '../../api/base/BaseCollection.methods';
import { UserProfiles } from '../../api/user/UserProfileCollection';

const UserManagementModal = ({ show, action, user, onClose }) => {
  const [updatedUser, setUpdatedUser] = useState(user);

  useEffect(() => {
    setUpdatedUser(user);
  }, [user]);

  const handleSaveChanges = () => {
    const collectionName = UserProfiles.getCollectionName();
    if (action === 'delete') {
      removeItMethod.callPromise({ collectionName, instance: user._id })
        .then(() => {
          swal('Success', 'User deleted successfully', 'success');
          onClose();
        })
        .catch((error) => swal('Error', error.message, 'error'));
    } else if (action === 'create') {
      const userData = {
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        password: updatedUser.password,
      };
      defineMethod.callPromise({ collectionName, definitionData: userData })
        .then(() => {
          swal('Success', 'User created successfully', 'success');
          onClose();
        })
        .catch((error) => swal('Error', error.message, 'error'));
    }
  };

  return (
    <Modal show={show} onHide={onClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{action === 'delete' ? 'Delete User' : 'Create User'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {action === 'delete' ? (
          <>
            <span className="d-flex align-items-center">
              <ExclamationTriangleFill color="red" size="10%" />
              <h4>Delete this user?</h4>
            </span>
            <hr />
            <p>{user.email}</p>
          </>
        ) : (
          <Form>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" value={updatedUser.firstName || ''} onChange={(e) => setUpdatedUser({ ...updatedUser, firstName: e.target.value })} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" value={updatedUser.lastName || ''} onChange={(e) => setUpdatedUser({ ...updatedUser, lastName: e.target.value })} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control type="email" value={updatedUser.email || ''} onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={updatedUser.password || ''} onChange={(e) => setUpdatedUser({ ...updatedUser, password: e.target.value })} />
            </Form.Group>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Close</Button>
        <Button variant="danger" onClick={handleSaveChanges}>
          {action === 'delete' ? 'Delete' : 'Save Changes'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

UserManagementModal.propTypes = {
  show: PropTypes.bool.isRequired,
  action: PropTypes.string.isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default UserManagementModal;
