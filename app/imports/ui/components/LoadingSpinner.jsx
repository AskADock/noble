import React from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';

const LoadingSpinner = ({ message }) => (
  <Container className="p-5">
    <Row className="justify-content-md-center"><Spinner animation="border" />{message}</Row>
  </Container>
);

LoadingSpinner.propTypes = {
  message: PropTypes.string,
};

LoadingSpinner.defaultProps = {
  message: 'Getting Data',
};

export default LoadingSpinner;
