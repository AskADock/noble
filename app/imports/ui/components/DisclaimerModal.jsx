import React, { useState } from 'react';
import { Container, Row, Col, Modal } from 'react-bootstrap';

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
    >
      <Modal.Header closeButton>
        <Modal.Title>Disclaimer</Modal.Title>
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
    </Modal>
  );
};

export default DisclaimerModal;
