import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
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
    <>
      <Container fluid className="color1">
        <Row className="py-4 text-center color1">
          <h1 className="text-white">Frequently Asked Questions</h1>
        </Row>
      </Container>
      <Container fluid className="faq-background">
        <Row className="justify-content-center mb-5">
          <Col className="col-11">
            <Row>
              <FAQFilter faq={faq} categories={categories} />
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  ) : (
    <LoadingSpinner message="Loading FAQ" />
  ));
};
export default FrequentlyAskedQuestions;
