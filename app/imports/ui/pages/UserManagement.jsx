import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Header from '../components/Header';
import { Users } from '../../api/user/UserCollection';
import { PAGE_IDS } from '../utilities/PageIDs';
import LoadingSpinner from '../components/LoadingSpinner';

const UserManagement = () => {
  // Fetch users all users
  // const { ready, users } = useTracker(() => {
  //   const subscription = Meteor.subscribe(Users.getUsersAdmin());
  //   const rdy = subscription.ready();
  //   const userItems = Meteor.users.find().fetch();
  //   return {
  //     users: userItems,
  //     ready: rdy,
  //   };
  // }, []);

  const ready = true;

  return (ready ? (
    <Container fluid className="p-0" id={PAGE_IDS.USER_MANAGEMENT}>
      <Header
        title="User Management"
        description="Add, remove, and manage users"
        background="color1"
      />
      <Container>
        <Row>
          <Col>
            <p>
              This page is for managing users.
            </p>
          </Col>
        </Row>
      </Container>
    </Container>
  ) : (
    <LoadingSpinner message="User Management" />
  ));
};

export default UserManagement;
