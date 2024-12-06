import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { PAGE_IDS } from '../utilities/PageIDs';

/* After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const SignOut = () => {
  Meteor.logout();
  return (
    <Row>
      <Col id={PAGE_IDS.SIGN_OUT} className="text-center py-5">
        <h2>You are signed out.</h2>
        <Button href="/">Return to Home</Button>
      </Col>
    </Row>
  );
};

export default SignOut;
