import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import swal from 'sweetalert';
import { useTracker } from 'meteor/react-meteor-data';
import { Questions } from '../../api/question/QuestionCollection';
import { Categories } from '../../api/category/CategoryCollection';
import { defineMethodAskADoc } from '../../api/base/BaseCollection.methods';
import LoadingSpinner from '../components/LoadingSpinner';

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

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (passcode !== 'AlwaysReadyAlwaysThere') {
      swal('Error', 'Incorrect passcode', 'error');
      return;
    }
    const collectionName = Questions.getCollectionName();
    const definitionData = { question, category };

    defineMethodAskADoc.callPromise({ collectionName, definitionData })
      .then(() => {
        swal('Success', 'Your question has been submitted!', 'success');
        // Reset form after success
        setCategory('');
        setPasscode('');
        setQuestion('');
      })
      .catch((error) => swal('Error', error.message, 'error'));
  };

  return ready ? (
    <Container fluid className="color1">
      <Row className="py-4 justify-content-center">
        <Col className="col-10 align-content-center">
          <Row className="py-5 color1 justify-content-center">
            <Col xs={12} md={8} lg={6} className="text-center text-white">
              <h1>Ask A Doc</h1>
              <p>Anonymously ask a Doctor any question. Your answer will appear in the FAQ page soon.</p>
            </Col>
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
                    style={{ resize: 'none', padding: '20px', fontSize: '1.1rem', lineHeight: '1.5', width: '100%' }}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" style={{ padding: '1vh 2vw', fontSize: '1.2rem' }}>
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  ) : (
    <LoadingSpinner message="Loading Categories" />
  );
};

export default AskADoc;
