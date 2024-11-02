import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Feedback } from '../../api/feedback/FeedbackCollection';
import LoadingSpinner from '../components/LoadingSpinner';

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

  return (ready ? (
    <>
      <Container fluid className="color1">
        <Row className="py-4 text-center">
          <Col>
            <h1 className="text-white">Feedback Management</h1>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            {feedback.map((feedbackItem) => (
              <Row key={feedbackItem._id} className="border-bottom py-3">
                <Col>
                  <p className="m-0">{feedbackItem.feedback}</p>
                </Col>
              </Row>
            ))}
          </Col>
        </Row>
      </Container>
    </>
  ) : <LoadingSpinner />);
};

export default FeedbackManagement;
