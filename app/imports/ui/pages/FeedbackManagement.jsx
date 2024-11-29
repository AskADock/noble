import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import swal from 'sweetalert';
import { removeItMethod } from '../../api/base/BaseCollection.methods';
import { Feedback } from '../../api/feedback/FeedbackCollection';
import Header from '../components/Header';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';

const FeedbackManagement = () => {
  // Subscribe to the Feedback collection
  const { ready, feedback } = useTracker(() => {
    const subscription = Feedback.subscribeFeedbackAdmin();
    const rdy = subscription.ready();
    const feedbackItems = Feedback.find().fetch();
    // console.log(feedbackItems);
    return {
      feedback: feedbackItems,
      ready: rdy,
    };
  });

  const [show, setShow] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  // Handle the modal close
  const handleClose = () => setShow(false);

  // Handle the delete button
  const handleDelete = () => {
    removeItMethod.callPromise({ collectionName: Feedback.getCollectionName(), instance: selectedFeedback._id })
      .then(() => {
        swal('Success', 'Feedback deleted successfully', 'success');
        handleClose();
      })
      .catch((error) => swal('Error', error.message, 'error'));
  };

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
          <Col sm={12} md={4} className="p-2">
            <Card className="p-2 text-center rounded-4">
              <Card.Title>
                <h3>Feedback Total</h3>
              </Card.Title>
              <Card.Body>
                <h4>{feedback.length}</h4>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} md={8} className="p-2">
            {feedback.map((f) => (
              <Card key={f._id} className="mb-3">
                <Card.Body>
                  <Card.Text>{f.feedback}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <div className="d-flex justify-content-between align-items-center">
                    <Button
                      variant="danger"
                      onClick={() => {
                        setSelectedFeedback(f);
                        setShow(true);
                      }}
                    >Delete
                    </Button>
                    <p>Sent on: {f.timestamp.toLocaleDateString()}</p>
                  </div>
                </Card.Footer>
              </Card>
            ))}
          </Col>
        </Row>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this feedback?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  ) : <LoadingSpinner />);
};

export default FeedbackManagement;
