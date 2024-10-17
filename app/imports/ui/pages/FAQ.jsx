import React from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { FAQ } from '../../api/faq/FAQCollection';
import { Categories } from '../../api/category/CategoryCollection';
import LoadingSpinner from '../components/LoadingSpinner';

const FrequentlyAskedQuestions = () => {
  // Subscribe to the FAQ collection.
  const { ready, faq, categories } = useTracker(() => {
    const subscription = FAQ.subscribeFAQ();
    const subscription2 = Categories.subscribeCategoryAll();
    const rdy = subscription.ready() && subscription2.ready();
    const FAQItems = FAQ.find().fetch();
    const categoryItems = Categories.find().fetch();
    // console.log(FAQItems);
    // console.log(categoryItems);
    return {
      faq: FAQItems,
      categories: categoryItems,
      ready: rdy,
    };
  });

  return (ready ? (
    <Container>
      <Row className="py-3">
        <h1>Frequently Asked Questions</h1>
      </Row>
      <Row>
        <Col>
          <Card className="rounded-3 p-3">
            <Row>
              <Col>
                <Form.Label>Search</Form.Label>
                <Form.Control type="text" placeholder="I want to know..." />
              </Col>
              <Col>
                <Form.Label>Category</Form.Label>
                <Form.Select>
                  {categories.map((category) => (
                    <option key={category._id}>{category.category}</option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
          </Card>
          {faq.map((question) => (
            <Card key={question._id} className="my-3 rounded-3">
              <Card.Header>
                {question.question}
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  <p>{question.answer}</p>
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner message="Loading FAQ" />
  );
};

export default FrequentlyAskedQuestions;
