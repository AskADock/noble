import React from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';

const LoadingSpinner = ({ message }) => (
  <Container className="p-5">
    <Row className="justify-content-center py-3">
      <Col className="text-center">
        <h1><strong>PREPARED FOR TOMORROW</strong></h1>
        <h2 className="breathing-text">{message}</h2>
      </Col>
    </Row>
    <Row className="justify-content-center py-5">
      <Col className="text-center">
        <p>Loading...</p>
        <Spinner animation="border" role="status" variant="primary"/>
      </Col>
    </Row>
  </Container>
);

LoadingSpinner.propTypes = {
  message: PropTypes.string,
};

LoadingSpinner.defaultProps = {
  message: 'Getting Data',
};

export default LoadingSpinner;
