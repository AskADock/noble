import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import swal from 'sweetalert';
import { Feedback } from '../../api/feedback/FeedbackCollection';
import { Passcodes } from '../../api/passcode/PasscodeCollection';
import { checkPasscodeMethod, defineMethodFeedback } from '../../api/base/BaseCollection.methods';

export const AskADoc = () => {
  // Form field state
  const [category, setCategory] = useState('');
  const [passcode, setPasscode] = useState('');
  const [question, setQuestion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const collectionNamePasscode = Passcodes.getCollectionName();
    // Check if the passcode is valid
    checkPasscodeMethod.callPromise({
      collectionName: collectionNamePasscode,
      definitionData: passcode,
    })
      .then((isValid) => {
        if (!isValid) {
          throw new Error('Invalid passcode. Please try again.');
        }
        // If valid, define the question
        const collectionNameQuestion = Feedback.getCollectionName();
        return defineMethodFeedback.callPromise({
          collectionName: collectionNameQuestion,
          definitionData: { category, question, answered: false },
        });
      })
      .then(() => {
        swal('Success', 'Your question has been submitted!', 'success');
        // Reset form after success
        setCategory('');
        setPasscode('');
        setQuestion('');
      })
      .catch((error) => {
        swal('Error', error.message, 'error'); // Handle both passcode and submission errors here
      });
  };

  return (
    <Container fluid className="ask-a-doc-background p-0">
      <Container>
        <Row className="py-5 text-center text-white">
          <h1>Ask A Doc</h1>
          <p>Anonymously ask a Doctor any question. Your answer will appear in the FAQ page soon.</p>
        </Row>
        <Row className="justify-content-center py-5">
          <Col xs={12} md={10} lg={8} className="text-center">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4">
                <Form.Control
                  type="password"
                  placeholder="Passcode"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  required
                  style={{ padding: '15px', fontSize: '1.1rem', marginBottom: '20px' }}
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Control
                  as="textarea"
                  rows={6}
                  placeholder="Type your question here..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
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

export default AskADoc;
