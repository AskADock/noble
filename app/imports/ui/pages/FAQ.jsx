import React from 'react';
import { Container, Row, Col, Card, Form, Button, Pagination, Accordion, Badge } from 'react-bootstrap';
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
    <Container fluid className="color2">
      <Row className="justify-content-center mb-5">
        <Col className="col-8">
          <Row className="py-4 text-center">
            <h1>Frequently Asked Questions</h1>
          </Row>
          <Row className="justify-content-center">
            <Col className="col-9">
              <Row>
                <Col classNmae="col-8">
                  <Form.Control type="text" placeholder="I want to know..." />
                </Col>
                <Col className="col-3">
                  <Form.Select>
                    <option>All Categories</option>
                    {categories.map((category) => (
                      <option key={category._id}>{category.category}</option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col>
              {faq.map((question) => (
                <Card className="my-3" key={question._id}>
                  <Accordion>
                    <Accordion.Item eventKey={question._id} className="p-2">
                      <Badge bg="primary" className="ms-auto">{question.category}</Badge>
                      <Accordion.Header>
                        <h5>{question.question}</h5>
                      </Accordion.Header>
                      <Accordion.Body>{question.answer}</Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Card>
              ))}
            </Col>
          </Row>
          <Row className="py-3">
            <Col className="d-flex justify-content-center">
              <Pagination>
                <Pagination.Prev />
                <Pagination.Item>{1}</Pagination.Item>
                <Pagination.Item>{2}</Pagination.Item>
                <Pagination.Item>{3}</Pagination.Item>
                <Pagination.Next />
              </Pagination>
            </Col>
          </Row>
          <Row className="justify-content-center text-center py-3">
            <Col className="col-4">
              <Card className="rounded-3 p-3">
                <Row>
                  <Col>
                    <h4>Can&apos;t find an answer?</h4>
                    <Button href="/" className="rounded-3">
                      Ask A Doc
                    </Button>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  ) : (
    <LoadingSpinner message="Loading FAQ" />
  ));
};
export default FrequentlyAskedQuestions;
