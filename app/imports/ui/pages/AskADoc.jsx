import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, FloatingLabel } from 'react-bootstrap';
import swal from 'sweetalert';
import { useTracker } from 'meteor/react-meteor-data';
import { Questions } from '../../api/question/QuestionCollection';
import { Categories } from '../../api/category/CategoryCollection';
import { Passcodes } from '../../api/passcode/PasscodeCollection';
import { checkPasscodeMethod, defineMethodAskADoc } from '../../api/base/BaseCollection.methods';
import Header from '../components/Header';
import DisclaimerModal from '../components/DisclaimerModal';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

export const AskADoc = () => {
  // Fetch categories with useTracker
  const { ready, categories } = useTracker(() => {
    const subscription = Categories.subscribeCategoryAll();
    const rdy = subscription.ready();
    const categoryItems = Categories.find().fetch();
    return {
      categories: categoryItems,
      ready: rdy,
    };
  }, []);

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
        const collectionNameQuestion = Questions.getCollectionName();
        return defineMethodAskADoc.callPromise({
          collectionName: collectionNameQuestion,
          definitionData: { category, question, answered: false },
        });
      })
      .then(() => {
        swal('Success', 'Your question has been submitted!', 'success', { id: COMPONENT_IDS.ASK_A_DOC_FORM_CONFIRM });
        // Reset form after success
        setCategory('');
        setPasscode('');
        setQuestion('');
      })
      .catch((error) => {
        swal('Error', error.message, 'error'); // Handle both passcode and submission errors here
      });
  };

  return (ready ? (
    <Container fluid className="ask-a-doc-background p-0" id={PAGE_IDS.ASK_A_DOC}>
      <DisclaimerModal />
      <Header
        title="Ask A Doc"
        subtitle="Anonymously ask a Doctor any question"
        background="color1"
        pageInstructions="askADocPage"
      />
      <Container>
        <Row className="justify-content-center py-5">
          <Col xs={12} md={10} lg={8} className="text-center">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Row>
                  <Col xs={12} md={6}>
                    <FloatingLabel
                      controlId={COMPONENT_IDS.ASK_A_DOC_FORM_CATEGORY}
                      label="Category"
                      className="mb-2"
                    >
                      <Form.Select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        id={COMPONENT_IDS.ASK_A_DOC_FORM_CATEGORY}
                      >
                        <option value="" disabled>Select a category</option>
                        {categories.map((cat) => (
                          <option key={cat._id} value={cat.category}>{cat.category}</option>
                        ))}
                      </Form.Select>
                    </FloatingLabel>
                  </Col>
                  <Col xs={12} md={6}>
                    <FloatingLabel
                      controlId={COMPONENT_IDS.ASK_A_DOC_FORM_PASSCODE}
                      label="Authenticate"
                      className="mb-2"
                    >
                      <Form.Control
                        type="password"
                        placeholder="Authenticate"
                        value={passcode}
                        onChange={(e) => setPasscode(e.target.value)}
                        required
                      />
                    </FloatingLabel>
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Control
                  as="textarea"
                  rows={6}
                  placeholder="Type your question here..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  required
                  id={COMPONENT_IDS.ASK_A_DOC_FORM_QUESTION}
                  style={{ resize: 'none', padding: '20px', fontSize: '1.1rem', lineHeight: '1.5', width: '100%' }}
                />
              </Form.Group>

              <Button variant="primary" type="submit" id={COMPONENT_IDS.ASK_A_DOC_FORM_SUBMIT} style={{ padding: '1vh 2vw', fontSize: '1.2rem' }}>
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
        <Row className="text-center">
          <h5 className="text-white">
            <strong>Reminder: Do NOT include any personally identifiable information in your question.</strong>
          </h5>
          <h5 className="text-white">
            Your answer will appear in the <a href="/FAQ" className="text-white">FAQ</a> page soon.
          </h5>
        </Row>
      </Container>
    </Container>
  ) : (
    <LoadingSpinner message="Ask A Doc" />
  ));
};

export default AskADoc;
