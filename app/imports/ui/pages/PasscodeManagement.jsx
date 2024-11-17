import React, { useState } from 'react';
import { Container, Row, Col, Table, ButtonGroup, Button, Card } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Passcodes } from '../../api/passcode/PasscodeCollection';
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
    // console.log(passcodesItems);
    return {
      ready: rdy,
      passcodes: passcodesItems,
    };
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [showModalGenerate, setShowModalGenerate] = useState(false);
  const [action, setAction] = React.useState(null);
  const [selectedPasscode, setSelectedPasscode] = useState({});

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
      <Container fluid className="color1">
        <Row className="text-center py-4">
          <h1 className="text-white">Passcode Management</h1>
        </Row>
      </Container>
      <Container>
        <Row className="pt-4 justify-content-center">
          <Col sm={12} md={4}>
            <Card className="rounded-4 p-3 text-center">
              <Card.Title>Password Count</Card.Title>
              <Card.Body>
                <h5>{passcodes.length}</h5>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} md={4}>
            <Card className="rounded-4 p-3 text-center">
              <Card.Title>Generate New Passcode</Card.Title>
              <Card.Body>
                <Button variant="primary" onClick={() => handleShowGenerateModal()}>
                  Generate Passcode
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="py-4">
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Passcode</th>
                  <th>Created At</th>
                  <th>Expires At</th>
                  <th>Expired</th>
                  <th>Option</th>
                </tr>
              </thead>
              <tbody>
                {passcodes.map((item) => (
                  <tr key={item._id}>
                    <td>{item.code}</td>
                    <td>{item.createdAt.toString()}</td>
                    <td>{item.expiredAt ? item.expiredAt.toString() : 'N/A'}</td>
                    <td>{item.expired ? 'Yes' : 'No'}</td>
                    <td>
                      <ButtonGroup>
                        <Button variant="primary" onClick={() => handleShowModal('edit', item)}>
                          Edit
                        </Button>
                        <Button variant="danger" onClick={() => handleShowModal('delete', item)}>
                          Delete
                        </Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
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
    <LoadingSpinner />
  ));
};

export default PasscodeManagement;
