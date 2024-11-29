import React, { useRef, useState } from 'react';
import { Container, Row, Col, Image, Button, Form, Card } from 'react-bootstrap';
import swal from 'sweetalert';
import { useTracker } from 'meteor/react-meteor-data';
import { Passcodes } from '../../api/passcode/PasscodeCollection';
import Header from '../components/Header';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';

// Prints generic Ask A Doc flyers for distribution.
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
    const iframe = document.createElement('iframe');
    iframe.style.position = 'absolute';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = 'none';
    document.body.appendChild(iframe);
    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write('<html><head><title>Print</title><style></style></head><body>');
    doc.write(`<div style="text-align: center;">${printContents}</div>`);
    doc.close();
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
    document.body.removeChild(iframe);
  };

  return (ready ? (
    <Container fluid className="p-0 med-staff-background" id={PAGE_IDS.FLYER_MANAGEMENT}>
      <Header
        title="Flyer Management"
        subtitle="Print Generic Ask A Doc Flyers"
        background="color1"
        pageInstructions="flyerManagementPage"
      />
      <Container className="py-4 mt-3 mb-2">
        <Row>
          <Col sm={12} md={4} className="py-2">
            <Card className="rounded-4 p-4">
              <Row>
                <Col sm={12} className="text-center py-2">
                  <Form.Group controlId="passcodeSelect">
                    <Form.Label><h5>Select a Passcode</h5></Form.Label>
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
                <Col sm={12} className="text-center justify-content-center py-2">
                  <Button variant="primary" onClick={handlePrint} className="text-center"><h5>Print Flyer</h5></Button>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col sm={12} md={8} className="py-2">
            {/* Printable Area */}
            <Card className="rounded-4 p-2">
              <div ref={printRef}>
                <Row className="py-4">
                  <Col className="justify-content-center text-center">
                    <h1 style={{ fontSize: '40px' }}>
                      Noble
                    </h1>
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
                    <Image src="/images/154_Logo.png" alt="Noble Logo" width="50%" style={{ maxWidth: '225px' }} />
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  ) :
    (
      <LoadingSpinner message="Flyer Management" />
    ));
};

export default FlyerManagement;
