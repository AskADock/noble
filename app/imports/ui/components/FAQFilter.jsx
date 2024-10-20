import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Col, Container, Dropdown, Form } from 'react-bootstrap';
import FAQList from './FAQList';

const FAQFilter = ({ faq, categories }) => {
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

  const filteredFAQ = selectedCategories.length > 0
    ? faq.filter((theFAQ) => selectedCategories.every((selectedCategory) => theFAQ.category === selectedCategory))
    : faq;

  return (
    <Container>
      <Row>
        <Col md={12} className="col-lg-11">
          <FAQList theFAQs={filteredFAQ} />
        </Col>
        <Col md={12} className="col-lg-1 pb-3 text-center">
          <Dropdown className="rounded-4">
            <Dropdown.Toggle id="dropdown-basic-button">Filter by Category</Dropdown.Toggle>
            <Dropdown.Menu>
              <Form>
                {categories.map((theCategory, index) => (
                  <div className="d-flex m-2" key={index}>
                    <Form.Check
                      type="checkbox"
                      value={theCategory.category}
                      onChange={handleCheckboxChange}
                      checked={isCategoryChecked(theCategory.category)}
                    />
                    <div className="ms-1">
                      {theCategory.category}
                    </div>
                  </div>
                ))}
                <Button variant="primary" className="m-2" onClick={resetFilter}>reset</Button>
              </Form>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
    </Container>
  );
};

FAQFilter.propTypes = {
  faq: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    question: PropTypes.string,
    answer: PropTypes.string,
    category: PropTypes.string,
  })).isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    category: PropTypes.string,
  })).isRequired,
};

export default FAQFilter;
