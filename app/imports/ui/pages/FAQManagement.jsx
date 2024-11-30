import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { FAQ } from '../../api/faq/FAQCollection';
import { Categories } from '../../api/category/CategoryCollection';
import Header from '../components/Header';
import FAQManagementFilter from '../components/FAQManagementFilter';
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
      <Header
        title="FAQ Management"
        subtitle="Add, Edit, and Delete FAQs"
        background="color1"
        pageInstructions="FAQManagementPage"
      />
      <Container>
        <Row>
          <Col>
            <FAQManagementFilter faqs={faqs} categories={categories} />
          </Col>
        </Row>
      </Container>
    </Container>
  ) : (
    <LoadingSpinner message="FAQ Management" />
  ));
};

export default FAQManagement;
