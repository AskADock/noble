import React from 'react';
import propTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import PageInstructionsModal from './PageInstructionsModal';

// This component displays the header for a page. It includes a title, subtitle, and a button to display page instructions.
const Header = ({ title, subtitle, background, pageInstructions }) => (
  <Container fluid className={background}>
    <Row className="py-5 text-center text-white text-shadow justify-content-center">
      <Col xs={12} md={{ span: 6, offset: 3 }} className="text-center">
        <h1>
          <strong>{title}</strong>
        </h1>
        <h4>
          {subtitle}
        </h4>
      </Col>
      <Col xs={12} md={{ span: 3, offset: 0 }} className="py-1 text-md-start text-center align-content-center">
        <PageInstructionsModal page={pageInstructions} />
      </Col>
    </Row>
  </Container>
);

Header.propTypes = {
  title: propTypes.string.isRequired,
  subtitle: propTypes.string.isRequired,
  background: propTypes.string.isRequired,
  pageInstructions: propTypes.string.isRequired,
};

export default Header;
