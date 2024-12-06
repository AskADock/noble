import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

/** Render a Not Found page if the user enters a URL that doesn't match any route. */
const NotAuthorized = () => (
  <Container fluid id={PAGE_IDS.NOT_AUTHORIZED} className="py-5 faq-background">
    <Row className="justify-content-center my-5">
      <Col className="text-center">
        <h2>
          Not Authorized
        </h2>
      </Col>
    </Row>
  </Container>
);

export default NotAuthorized;
