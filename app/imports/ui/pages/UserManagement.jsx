import React, { useState } from 'react';
import { Container, Row, Col, ButtonGroup, Button, Card } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import Header from '../components/Header';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import { PAGE_IDS } from '../utilities/PageIDs';
import LoadingSpinner from '../components/LoadingSpinner';
import UserManagementModal from '../components/UserManagementModal';

const UserManagement = () => {
  // Fetch users all users
  const { ready, userProfiles } = useTracker(() => {
    const subscription = UserProfiles.subscribeUserAdmin();
    const profile = UserProfiles.find().fetch();
    return {
      ready: subscription ? subscription.ready() : false,
      userProfiles: profile,
    };
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState('');
  const defaultUser = { id: '', firstName: '', lastName: '', email: '', password: '' };
  const [selectedUser, setSelectedUser] = useState({});

  const handleShowModal = (actionType, user) => {
    setAction(actionType);
    setSelectedUser(user);
    setShowModal(true);
  };

  return (ready ? (
    <Container fluid className="p-0 med-staff-background" id={PAGE_IDS.USER_MANAGEMENT}>
      <Header
        title="User Management"
        subtitle="Add and Remove users"
        pageInstructions="userManagementPage"
        background="color1"
      />
      <Container>
        <Row className="py-5">
          <Col md={3} sm={12}>
            <Row className="mb-3">
              <Card className="rounded-4 p-3 text-center">
                <Card.Title>User Count</Card.Title>
                <Card.Body>
                  <h5>{userProfiles.length}</h5>
                </Card.Body>
              </Card>
            </Row>
            <Row className="mb-3">
              <Card className="p-1 rounded-4 text-center">
                <Card.Title>
                  Add User
                </Card.Title>
                <Card.Body className="text-center">
                  <Button variant="primary" onClick={() => handleShowModal('create', defaultUser)}>
                    Add User
                  </Button>
                </Card.Body>
              </Card>
            </Row>
          </Col>
          <Col md={9} sm={12}>
            <Row>
              <h2 className="text-dark-blue">
                <strong>Current Users</strong>
              </h2>
            </Row>
            {userProfiles.map((user) => (
              <Card key={user._id} className="rounded-4 mb-3">
                <Card.Body>
                  <Card.Title>
                    Username: {user.email}
                  </Card.Title>
                  <Row>
                    <Col>
                      <Card.Text>
                        Name: {user.firstName} {user.lastName}
                      </Card.Text>
                    </Col>
                    <Col>
                      <Card.Text>
                        Role: {user.role}
                      </Card.Text>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer className="text-end">
                  <ButtonGroup>
                    <Button variant="danger" onClick={() => handleShowModal('delete', user)}>Delete</Button>
                  </ButtonGroup>
                </Card.Footer>
              </Card>
            ))}
          </Col>
        </Row>
      </Container>
      <UserManagementModal
        show={showModal}
        action={action}
        onClose={() => setShowModal(false)}
        user={selectedUser}
      />
    </Container>
  ) : (
    <LoadingSpinner message="User Management" />
  ));
};

export default UserManagement;
