import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { FAQ } from '../../api/faq/FAQCollection';
import { Categories } from '../../api/category/CategoryCollection';
import FAQManagementFilter from '../components/FAQManagementFilter';
import LoadingSpinner from '../components/LoadingSpinner';

/* Renders a table containing all of the FAQ documents. Allows admins to manage them. */
const FAQManagement = () => {
  // Subscribe to the FAQ and Category collection.
  const { ready, faqs, categories } = useTracker(() => {
    const subscription = FAQ.subscribeFAQ();
    const subscription2 = Categories.subscribeCategoryAll();
    const rdy = subscription.ready() && subscription2.ready();
    const items = FAQ.find().fetch();
    const categoryItems = Categories.find().fetch();
    return {
      faqs: items,
      categories: categoryItems,
      ready: rdy,
    };
  }, []);

  return (ready ? (
    <Container fluid className="p-0 med-staff-home-background">
      <Container fluid className="color1">
        <Row className="py-4 text-center">
          <Col>
            <h1 className="text-white">FAQ Management</h1>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            <FAQManagementFilter faqs={faqs} categories={categories} />
          </Col>
        </Row>
      </Container>
    </Container>
  ) : <LoadingSpinner message="Loading FAQs..." />);
};

export default FAQManagement;
