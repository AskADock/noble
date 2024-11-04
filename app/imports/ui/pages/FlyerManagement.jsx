import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Passcodes } from '../../api/passcode/PasscodeCollection';
import LoadingSpinner from '../components/LoadingSpinner';

const FlyerManagement = () => {
  // Subscribe to the passcode collection.
  const { ready, passcodes } = useTracker(() => {
    const subscription = Passcodes.subscribeQuestionPasscode();
    const rdy = subscription.ready();
    const passcodeItems = Passcodes.find().fetch();
    return {
      passcodes: passcodeItems,
      ready: rdy,
    };
  }, []);

  // Get the current passcode
  const currentPasscode = passcodes[0].passcode;

  return (ready ? (
    <>
      <Container fluid className="color1">
        <Row className="py-4 text-center">
          <Col>
            <h1 className="text-white">Flyer Management</h1>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className="py-4">
          <Col className="justify-content-center text-center">
            <h1>Noble</h1>
            <p>Prepared for Tomorrow</p>
            <hr />
            <Image src="/images/FAQ.png" alt="Logo" width="200" height="200" />
            <br />
            <p>
              Ask A Doc Passcode: <strong>{currentPasscode || 'error'}</strong>
            </p>
            <hr />
            <p>
              Ask health-related questions anonymously
            </p>
            <h2>
              No Login Required
            </h2>
          </Col>
        </Row>
      </Container>
    </>
  ) : (
    <LoadingSpinner message="Loading Passcodes" />
  ));
};

export default FlyerManagement;
