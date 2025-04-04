import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Accordion, Form, Button } from 'react-bootstrap';
import QuestionManagementList from './QuestionManagementList';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

const QuestionManagementFilter = ({ unansweredQuestions, answeredQuestions, categories }) => {
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

  // Filter questions based on selected categories
  const questions = selectedCategories.length > 0
    ? answeredQuestions.filter((question) => selectedCategories.includes(question.category))
    : answeredQuestions;

  const unAnsweredQuestions = selectedCategories.length > 0
    ? unansweredQuestions.filter((question) => selectedCategories.includes(question.category))
    : unansweredQuestions;

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
                        id={COMPONENT_IDS.FAQ_FILTER_DROPDOWN_SELECT}
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
                        <h5>{theCategory.category}</h5>
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
        </Col>

        {/* Question List Section */}
        <Col md={12} lg={9}>
          <QuestionManagementList questions={questions} unansweredQuestions={unAnsweredQuestions} category={categories} />
        </Col>
      </Row>
    </Container>
  );
};

QuestionManagementFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    category: PropTypes.string,
  })).isRequired,
  unansweredQuestions: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    question: PropTypes.string,
    category: PropTypes.string,
    answered: PropTypes.bool,
    timestamp: PropTypes.instanceOf(Date),
  })).isRequired,
  answeredQuestions: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    question: PropTypes.string,
    category: PropTypes.string,
    answered: PropTypes.bool,
    timestamp: PropTypes.instanceOf(Date),
  })).isRequired,
};

export default QuestionManagementFilter;
