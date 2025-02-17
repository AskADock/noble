import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

const DisclaimerModal = () => {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
      keyboard={false}
      centered
      id={COMPONENT_IDS.DISCLAIMER_MODAL}
    >
      <Modal.Header closeButton className="color1">
        <Modal.Title>
          <h2 className="text-white"><strong>Disclaimer</strong></h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col>
              <p>
                <strong>Noble provides general health information and is NOT a substitute for professional medical advice.</strong>
              </p>
              <p>
                Do <strong>NOT</strong> submit classified, sensitive, and self-identifying information.
              </p>
              <p>
                <strong>Always</strong> consult a healthcare provider or your local Guard Medical Unit (GMU) before acting on any information from this app.
              </p>
              <p>
                <strong>Be Prepared For Tomorrow</strong>
              </p>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose} variant="primary" id={COMPONENT_IDS.DISCLAIMER_MODAL_CLOSE}>
          <strong>Roger</strong>
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DisclaimerModal;
