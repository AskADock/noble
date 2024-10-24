import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
// import { FiPlusCircle } from 'react-icons/fi';

export const AskADoc = () => {
  // Use state to handle form data
  const [question, setQuestion] = useState('');
  const [category, setCategory] = useState('');

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted Question:', question);
    console.log('Submitted Category:', category);
    // Clear form fields after submission
    setQuestion('');
    setCategory('');
  };

  return (
    <Container fluid className="color1">
      <Row className="py-4 justify-content-center">
        <Col className="col-11 align-content-center">
          <Row className="py-5 color1 justify-content-center">
            <Col xs={12} md={8} lg={6} className="text-center text-white">
              <h1>Ask A Doc</h1>
              <p> Anonymously ask a Doctor any question. Your answer will appear in the FAQ page soon.</p>
            </Col>
          </Row>
          <Row className="justify-content-center" style={{ width: '100%', marginBottom: '20px' }}>
            <Col xs={12} md={10} lg={8} className="text-center">
              <Form>
                <Form.Group className="mb-4">
                  <Form.Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    style={{ padding: '15px', fontSize: '1.1rem', marginBottom: '20px', width: '100%' }}
                  >
                    <option value="" disabled>Select a category</option>
                    <option value="General Health">General Health</option>
                    <option value="Mental Health">Mental Health</option>
                    <option value="Vision">Vision</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Control
                    as="textarea"
                    rows={6}
                    placeholder="type your question here...."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    required
                    style={{ resize: 'none', padding: '20px', fontSize: '1.1rem', lineHeight: '1.5', width: '100%' }}
                  />
                </Form.Group>
              </Form>
            </Col>
          </Row>
          <div className="pb-5 text-center">
            <Button className="" variant="primary" type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AskADoc;
