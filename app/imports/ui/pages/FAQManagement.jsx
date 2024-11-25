import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { FAQ } from '../../api/faq/FAQCollection';
import { Categories } from '../../api/category/CategoryCollection';
import FAQManagementFilter from '../components/FAQManagementFilter';
import PageInstructionsModal from '../components/PageInstructionsModal';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';

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
    <Container fluid className="p-0 med-staff-background" id={PAGE_IDS.FAQ_MANAGEMENT}>
      <Container fluid className="color1">
        <Row className="py-5 text-center text-white text-shadow justify-content-center">
          <Col xs={12} md={{ span: 6, offset: 3 }} className="text-center">
            <h1>
              <strong>FAQ Management</strong>
            </h1>
            <h4>
              Add, Edit, and Delete FAQs
            </h4>
          </Col>
          <Col xs={12} md={{ span: 3, offset: 0 }} className="text-md-start text-center align-content-center">
            <PageInstructionsModal page="FAQManagementPage" />
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
