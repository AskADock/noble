import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import swal from 'sweetalert';
import { useTracker } from 'meteor/react-meteor-data';
import { Questions } from '../../api/question/QuestionCollection';
import { Categories } from '../../api/category/CategoryCollection';
import { Passcodes } from '../../api/passcode/PasscodeCollection';
import { checkPasscodeMethod, defineMethodAskADoc } from '../../api/base/BaseCollection.methods';
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
    // console.log(categoryItems);
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

  return ready ? (
    <Container fluid className="ask-a-doc-background p-0" id={PAGE_IDS.ASK_A_DOC}>
      <DisclaimerModal />
      <Container>
        <Row className="py-5 text-center text-white">
          <h1>Ask A Doc</h1>
          <p>Anonymously ask a Doctor any question. Your answer will appear in the FAQ page soon.</p>
        </Row>
        <Row className="justify-content-center py-5">
          <Col xs={12} md={10} lg={8} className="text-center">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4">
                <Row>
                  <Col xs={12} md={6}>
                    <Form.Select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      required
                      id={COMPONENT_IDS.ASK_A_DOC_FORM_CATEGORY}
                      style={{ padding: '15px', fontSize: '1.1rem', marginBottom: '20px', width: '100%' }}
                    >
                      <option value="" disabled>Select a category</option>
                      {categories.map((cat) => (
                        <option key={cat._id} value={cat.category}>{cat.category}</option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Control
                      type="password"
                      placeholder="Passcode"
                      value={passcode}
                      onChange={(e) => setPasscode(e.target.value)}
                      required
                      id={COMPONENT_IDS.ASK_A_DOC_FORM_PASSCODE}
                      style={{ padding: '15px', fontSize: '1.1rem', marginBottom: '20px' }}
                    />
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
      </Container>
    </Container>
  ) : (
    <LoadingSpinner message="Loading Categories" />
  );
};

export default AskADoc;
