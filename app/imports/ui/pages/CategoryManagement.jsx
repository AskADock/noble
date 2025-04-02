import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  ButtonGroup,
  Button,
  Card,
} from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Categories } from '../../api/category/CategoryCollection';
import CategoryManagementModal from '../components/CategoryManagementModal';
import Header from '../components/Header';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';

const CategoryManagement = () => {
  // Subscribe to the category collection
  const { ready, categories } = useTracker(() => {
    const subscription = Categories.subscribeCategoryAll();
    const rdy = subscription.ready();
    const categoryItems = Categories.find({}).fetch();
    return {
      ready: rdy,
      categories: categoryItems,
    };
  }, []);
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  return ready ? (
    <Container
      fluid
      className="p-0 med-staff-background"
      id={PAGE_IDS.CATEGORY_MANAGEMENT}
    >
      <Header
        title="Category Management"
        subtitle="Create, Edit, and Delete Categories"
        background="color1"
        pageInstructions="categoryManagementPage"
      />
      <Container>
        <Row className="py-4 justify-content-center">
          <Col sm={12} md={3}>
            <Card className="rounded-4 p-3 text-center">
              <Card.Title>Category Count</Card.Title>
              <Card.Body>
                <h5>{categories.length}</h5>
                <Button
                  variant="primary"
                  onClick={() => {
                    setShowModal(true);
                    setAction('add');
                  }}
                >
                  Add Category
                </Button>
              </Card.Body>
            </Card>
          </Col>
          {/* Display each category with edit and delete buttons */}
          <Col sm={12} md={9}>
            {categories.map((category) => (
              <Card className="rounded-4 text-center mb-2">
                <Card.Body>
                  <Row>
                    <Col>
                      <h5>{category.category}</h5>
                    </Col>
                    <Col>
                      <ButtonGroup>
                        <Button
                          variant="warning"
                          onClick={() => {
                            setAction('edit');
                            setShowModal(true);
                            setSelectedCategory(category);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => {
                            setAction('delete');
                            setShowModal(true);
                            setSelectedCategory(category);
                          }}
                        >
                          Delete
                        </Button>
                      </ButtonGroup>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>
      </Container>
      <CategoryManagementModal
        show={showModal}
        onClose={() => setShowModal(false)}
        action={action}
        category={selectedCategory}
      />
    </Container>
  ) : (
    <LoadingSpinner message="Category Management" />
  );
};

export default CategoryManagement;
