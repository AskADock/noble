import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Passcodes } from '../../api/passcode/PasscodeCollection';
import LoadingSpinner from '../components/LoadingSpinner';

const PasscodeManagement = () => {
  // Subscribe to the passcode collection
  const { ready, passcodes } = useTracker(() => {
    const subscription = Passcodes.subscribeAdmin();
    const rdy = subscription.ready();
    const passcodesItems = Passcodes.find({}).fetch();
    console.log(passcodesItems);
    return {
      ready: rdy,
      passcodes: passcodesItems,
    };
  }, []);

  return (ready ? (
    <>
      <Container fluid className="color1">
        <Row className="text-center py-4">
          <h1 className="text-white">Passcode Management</h1>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            <h2>Passcodes</h2>
            <ul>
              {passcodes.map((passcode) => (
                <li key={passcode._id}>{passcode.code}</li>
              ))}
            </ul>
          </Col>
        </Row>
      </Container>
    </>
  ) : (
    <LoadingSpinner />
  ));
};

export default PasscodeManagement;
