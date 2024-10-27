import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Accordion, Form, Button } from 'react-bootstrap';
import FAQManagementList from './FAQManagementList';

const FAQManagementFilter = ({ faqs, categories }) => {
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
                    <div className="d-flex m-1" key={index}>
                      <Form.Check
                        type="checkbox"
                        value={theCategory.category}
                        onChange={handleCheckboxChange}
                        checked={isCategoryChecked(theCategory.category)}
                      />
                      <div className="ms-1">
                        <h5>{theCategory.category}</h5>
                      </div>
                    </div>
                  ))}
                  <Button variant="primary" className="m-2" onClick={resetFilter}>reset</Button>
                </Form>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>

        {/* FAQ List Section */}
        <Col md={12} lg={9}>
          <FAQManagementList faqs={questions} category={categories} />
        </Col>
      </Row>
    </Container>
  );
};

FAQManagementFilter.propTypes = {
  faqs: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    question: PropTypes.string,
    answer: PropTypes.string,
    category: PropTypes.string,
  })).isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string,
  })).isRequired,
};

export default FAQManagementFilter;
