import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { FAQ } from '../../api/faq/FAQCollection';
import { Categories } from '../../api/category/CategoryCollection';
import FAQFilter from '../components/FAQFilter';
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
          <Row>
            <FAQFilter faq={faq} categories={categories} />
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
