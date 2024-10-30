import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Col, Container, Form, Card, Accordion } from 'react-bootstrap';
import FAQList from './FAQList';

/**
 * Renders the FAQ filter component. This component is responsible for filtering the FAQ questions by category.
 * Passes the filtered FAQ questions to the FAQList component.
 * @param faq
 * @param categories
 */
const FAQFilter = ({ faq, questions, categories }) => {
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
    ? faq.filter((question) => selectedCategories.includes(question.category))
    : faq;

  const filteredQuestions = selectedCategories.length > 0
    ? questions.filter((question) => selectedCategories.includes(question.category))
    : questions;

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

          {/* Ask A Doc Button (Only for large screens) */}
          <div className="d-none d-lg-block mt-4">
            <Card className="rounded-4 p-3 text-center color3">
              <h4>Can&apos;t find an answer?</h4>
              <Button href="/ask-a-doc" className="rounded-3">
                Ask A Doc
              </Button>
            </Card>
          </div>
        </Col>

        {/* FAQ List Section */}
        <Col md={12} lg={9}>
          <FAQList faq={filteredFAQ} questions={filteredQuestions} />

          {/* Ask A Doc Button (Only for mobile screens) */}
          <div className="d-lg-none mt-4">
            <Card className="rounded-4 p-3 text-center">
              <h4>Can&apos;t find an answer?</h4>
              <Button href="/ask-a-doc" className="rounded-3">
                Ask A Doc
              </Button>
            </Card>
          </div>
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
  questions: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    question: PropTypes.string,
    answer: PropTypes.string,
    category: PropTypes.string,
    answered: PropTypes.bool,
  })).isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    category: PropTypes.string,
  })).isRequired,
};

export default FAQFilter;
