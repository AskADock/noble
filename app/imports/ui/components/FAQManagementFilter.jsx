import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Accordion, Form, Button, Card } from 'react-bootstrap';
import FAQManagementList from './FAQManagementList';
import CreateFAQModal from './CreateFAQModal';

const FAQManagementFilter = ({ faqs, categories }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const [selectedCategories, setSelectedCategories] = useState([]);
  const resetFilter = () => {
    setSelectedCategories([]);
  };

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    if (selectedCategories.includes(value)) {
      setSelectedCategories(selectedCategories.filter((filter) => filter !== value));
    } else {
      setSelectedCategories([...selectedCategories, value]);
    }
  };
  const isCategoryChecked = (category) => selectedCategories.includes(category);

  // Filter FAQS based on selected categories
  const questions = selectedCategories.length > 0
    ? faqs.filter((faq) => selectedCategories.includes(faq.category))
    : faqs;

  return (
    <Container>
      <Row className="my-4">
        {/* Filter Section */}
        <Col md={12} lg={3} className="pb-3 text-start">
          <Accordion>
            <Accordion.Item eventKey={0}>
              <Accordion.Header>
                <h4>Filter by Category</h4>
              </Accordion.Header>
              <Accordion.Body>
                <Form>
                  {categories.map((theCategory, index) => (
                    <div className="d-flex m-1 align-items-center" key={index}>
                      <Form.Check
                        type="checkbox"
                        value={theCategory.category}
                        onChange={handleCheckboxChange}
                        checked={isCategoryChecked(theCategory.category)}
                      />
                      <button
                        type="button"
                        className="ms-1 btn btn-link p-0"
                        style={{
                          all: 'unset',
                          cursor: 'pointer',
                        }}
                        onClick={() => handleCheckboxChange({ target: { value: theCategory.category } })}
                        aria-label={`Toggle ${theCategory.category}`}
                      >
                        <h5 className="m-0">{theCategory.category}</h5>
                      </button>
                    </div>
                  ))}
                  <Button variant="primary" className="m-2" onClick={resetFilter}>
                    Reset
                  </Button>
                </Form>

              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <Card className="rounded-4 mt-3 text-center p-3">
            <Card.Title>Create a FAQ</Card.Title>
            <Card.Body>
              <Button variant="primary" onClick={() => handleShowModal()}>Add FAQ</Button>
            </Card.Body>
          </Card>
        </Col>

        {/* FAQ List Section */}
        <Col md={12} lg={9}>
          <FAQManagementList faqs={questions} category={categories} />
        </Col>
      </Row>

      <CreateFAQModal
        show={showModal}
        categories={categories}
        onClose={() => setShowModal(false)}
      />
    </Container>
  );
};

FAQManagementFilter.propTypes = {
  faqs: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    question: PropTypes.string,
    answer: PropTypes.string,
    category: PropTypes.string,
    timestamp: PropTypes.instanceOf(Date),
  })).isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string,
  })).isRequired,
};

export default FAQManagementFilter;
