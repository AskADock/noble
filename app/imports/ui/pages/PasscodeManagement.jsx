import React, { useState } from 'react';
import { Container, Row, Col, ButtonGroup, Button, Card } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Passcodes } from '../../api/passcode/PasscodeCollection';
import Header from '../components/Header';
import PasscodeManagementModal from '../components/PasscodeManagementModal';
import PasscodeGenerateModal from '../components/PasscodeGenerateModal';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';

const PasscodeManagement = () => {
  // Subscribe to the passcode collection
  const { ready, passcodes } = useTracker(() => {
    const subscription = Passcodes.subscribeAdmin();
    const rdy = subscription.ready();
    const passcodesItems = Passcodes.find({}).fetch();
    return {
      ready: rdy,
      passcodes: passcodesItems,
    };
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [showModalGenerate, setShowModalGenerate] = useState(false);
  const [action, setAction] = useState('');
  const defaultPasscode = { code: '', createdAt: new Date(), expiredAt: new Date(), expired: false };
  const [selectedPasscode, setSelectedPasscode] = useState(defaultPasscode);

  const handleShowModal = (actionType, passcode) => {
    setAction(actionType);
    setSelectedPasscode(passcode);
    setShowModal(true);
  };

  const handleShowGenerateModal = () => {
    setShowModalGenerate(true);
  };

  return (ready ? (
    <Container fluid className="p-0 med-staff-background" id={PAGE_IDS.PASSCODE_MANAGEMENT}>
      <Header
        title="Passcode Management"
        subtitle="Generate, Edit, and Delete Passcodes"
        background="color1"
        pageInstructions="passcodeManagementPage"
      />
      <Container>
        <Row className="py-4 justify-content-center">
          <Col sm={12} md={3}>
            <Row className="p-1">
              <Col sm={12} className="p-1">
                <Card className="rounded-4 p-3 text-center">
                  <Card.Title>Password Count</Card.Title>
                  <Card.Body>
                    <h5>{passcodes.length}</h5>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={12} className="p-1">
                <Card className="rounded-4 p-3 text-center">
                  <Card.Title>Generate New Passcode</Card.Title>
                  <Card.Body>
                    <Button variant="primary" onClick={handleShowGenerateModal}>
                      Generate Passcode
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col sm={12} md={9}>
            <Row className="p-1">
              <h2 className="text-dark-blue">
                <strong>Current Passcodes</strong>
              </h2>
              <Col className="p-1">
                {passcodes.map((item) => (
                  <Card key={item._id} className="rounded-4 mb-3">
                    <Card.Body>
                      <Card.Title>
                        <strong>Passcode:</strong> {item.code}
                      </Card.Title>
                      <Card.Text>
                        <strong>Created At:</strong> {item.createdAt.toLocaleString()}<br />
                        <strong>Expires At:</strong> {item.expiredAt ? item.expiredAt.toLocaleString() : 'N/A'}<br />
                        <strong>Expired:</strong> {item.expired ? 'Yes' : 'No'}
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer className="text-end">
                      <ButtonGroup>
                        <Button variant="primary" onClick={() => handleShowModal('edit', item)}>
                          Edit
                        </Button>
                        <Button variant="danger" onClick={() => handleShowModal('delete', item)}>
                          Delete
                        </Button>
                      </ButtonGroup>
                    </Card.Footer>
                  </Card>
                ))}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <PasscodeManagementModal
        show={showModal}
        action={action}
        onClose={() => setShowModal(false)}
        passcode={selectedPasscode}
      />
      <PasscodeGenerateModal
        show={showModalGenerate}
        onClose={() => setShowModalGenerate(false)}
      />
    </Container>
  ) : (
    <LoadingSpinner message="Passcode Management" />
  ));
};

export default PasscodeManagement;
