import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Feedback } from '../../api/feedback/FeedbackCollection';
import Header from '../components/Header';
import FeedbackManagementModal from '../components/FeedbackManagementModal';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';

const FeedbackManagement = () => {
  // Subscribe to the Feedback collection
  const { ready, feedback } = useTracker(() => {
    const subscription = Feedback.subscribeFeedbackAdmin();
    const rdy = subscription.ready();
    const feedbackItems = Feedback.find().fetch();
    return {
      feedback: feedbackItems,
      ready: rdy,
    };
  });
  const [showModal, setShowModal] = useState(false);
  const defaultFeedback = { feedback: 'Error' };
  const [selectedFeedback, setSelectedFeedback] = useState(defaultFeedback);

  return (ready ? (
    <Container fluid className="p-0 med-staff-background" id={PAGE_IDS.FEEDBACK_MANAGEMENT}>
      <Header
        title="Feedback Management"
        subtitle="Review Feedback"
        background="color1"
        pageInstructions="feedbackManagementPage"
      />
      <Container>
        <Row className="py-4">
          <Col sm={12} md={3} className="p-2">
            <Card className="p-2 text-center rounded-4">
              <Card.Title>
                <h3>Feedback Total</h3>
              </Card.Title>
              <Card.Body>
                <h4>{feedback.length}</h4>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} md={9} className="p-2">
            {feedback.map((f) => (
              <Card key={f._id} className="rounded-4 mb-3">
                <Card.Body>
                  <Card.Text>{f.feedback}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <div className="d-flex justify-content-between align-items-center">
                    <p>Sent on: {f.timestamp.toLocaleDateString()}</p>
                    <Button
                      variant="danger"
                      onClick={() => {
                        setSelectedFeedback(f);
                        setShowModal(true);
                      }}
                    >Delete
                    </Button>
                  </div>
                </Card.Footer>
              </Card>
            ))}
          </Col>
        </Row>
        <FeedbackManagementModal
          show={showModal}
          feedback={selectedFeedback}
          onClose={() => setShowModal(false)}
        />
      </Container>
    </Container>
  ) : (
    <LoadingSpinner message="Feedback Management" />
  ));
};

export default FeedbackManagement;
