import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import swal from 'sweetalert';
import { Feedback } from '../../api/feedback/FeedbackCollection';
import { defineMethodFeedback } from '../../api/base/BaseCollection.methods';

export const Feedbacks = () => {
  // Form field state
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const collectionNameFeedback = Feedback.getCollectionName();
    defineMethodFeedback.callPromise({
      collectionName: collectionNameFeedback,
      definitionData: { feedback },
    })
      .then(() => {
        swal('Success', 'Your feedback has been submitted!', 'success');
        // Reset form after success
        setFeedback('');
      })
      .catch((error) => {
        swal('Error', error.message, 'error'); // Handle both passcode and submission errors here
      });
  };

  return (
    <Container fluid className="ask-a-doc-background p-0">
      <Container>
        <Row className="py-5 text-center text-white">
          <h1>Feedback</h1>
          <p>Leave your feedback here. Any feedback will help imporve the site.</p>
        </Row>
        <Row className="justify-content-center py-5">
          <Col xs={12} md={10} lg={8} className="text-center">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4">
                <Form.Control
                  as="textarea"
                  rows={6}
                  placeholder="Type your feedabck here..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  required
                  style={{ resize: 'none', padding: '20px', fontSize: '1.1rem', lineHeight: '1.5', width: '100%' }}
                />
              </Form.Group>

              <Button variant="primary" type="submit" style={{ padding: '1vh 2vw', fontSize: '1.2rem' }}>
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Feedbacks;