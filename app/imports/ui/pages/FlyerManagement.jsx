import React, { useRef, useState } from 'react';
import { Container, Row, Col, Image, Button, Form, Card } from 'react-bootstrap';
import swal from 'sweetalert';
import { useTracker } from 'meteor/react-meteor-data';
import { Passcodes } from '../../api/passcode/PasscodeCollection';
import LoadingSpinner from '../components/LoadingSpinner';

const FlyerManagement = () => {
  const printRef = useRef();
  const [selectedPasscode, setSelectedPasscode] = useState('');

  // Subscribe to the passcode collection.
  const { ready, passcodes } = useTracker(() => {
    const subscription = Passcodes.subscribeQuestionPasscode();
    const rdy = subscription.ready();
    const passcodeItems = Passcodes.find({ expired: false }).fetch();
    // console.log(passcodeItems);
    return {
      passcodes: passcodeItems,
      ready: rdy,
    };
  }, []);

  // Update selected passcode
  const handlePasscodeChange = (event) => {
    setSelectedPasscode(event.target.value);
  };

  const handlePrint = () => {
    if (!selectedPasscode) {
      swal('Error', 'Please select a passcode to print a flyer.', 'error');
      return;
    }
    const printContents = printRef.current.innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  };

  return (ready ? (
    <>
      <Container fluid className="color1">
        <Row className="py-4 text-center">
          <Col>
            <h1 className="text-white">Flyer Management</h1>
          </Col>
        </Row>
      </Container>
      <Container className="py-4">
        <Card className="rounded-4 p-3">
          <Row>
            <Col sm={12} md={6} className="text-center">
              <Form.Group controlId="passcodeSelect">
                <Form.Label>Select a Passcode</Form.Label>
                <Form.Control as="select" value={selectedPasscode} onChange={handlePasscodeChange}>
                  <option value="" disabled>Select a passcode</option>
                  {passcodes.map((passcode) => (
                    <option key={passcode._id} value={passcode.code}>
                      {passcode.code}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col sm={12} md={6} className="text-center justify-content-center py-2">
              <Button variant="primary" onClick={handlePrint}>Print Flyer</Button>
            </Col>
          </Row>
        </Card>
      </Container>
      {/* Printable Area */}
      <Container className="my-4">
        <div ref={printRef} className="printable">
          <Row className="py-4">
            <Col className="justify-content-center text-center">
              <h1>Noble</h1>
              <p style={{ fontSize: '20px' }}>
                Prepared for Tomorrow
              </p>
              <hr />
              <Image src="/images/noble-qrcode.png" alt="Noble QRcode" width="50%" style={{ maxWidth: '450px' }} />
              <p className="py-2" style={{ fontSize: '25px' }}>
                Ask A Doc Passcode: <strong>{selectedPasscode || 'ERROR: No Passcode'}</strong>
              </p>
              <hr />
              <h3>
                Ask health-related questions anonymously
              </h3>
              <h2>
                No Login Required
              </h2>
              <Image src="/images/154_Logo.png" alt="Noble Logo" width="50%" style={{ maxWidth: '250px' }} />
            </Col>
          </Row>
        </div>
      </Container>
    </>
  ) :
    (
      <LoadingSpinner message="Loading Passcodes" />
    ));
};

export default FlyerManagement;