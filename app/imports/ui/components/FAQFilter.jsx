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

          <div className="d-none d-lg-block mt-4">
            <Card className="rounded-4 p-3 text-center color3">
              <h4>Resources</h4>
              <Col className="text-start">
                <a href="mailto:154mdg.gcc@us.af.mil" className="text-decoration-none">
                  <strong>154 MDG Org Box</strong>
                </a>
                <br />
                <em>*Send any questions or documents to our org box</em><br />
                <br />
                <a href="https://usaf.dps.mil/sites/HIANG/154WG/154MDG" target="_blank" className="text-decoration-none" rel="noreferrer">
                  <strong>154 MDG SharePoint</strong>
                </a>
                <br />
                <em>*MDG resources (CAC required)</em><br />
                <br />
                <a href="https://asimsimr.health.mil/imr/myimr.aspx" target="_blank" className="text-decoration-none" rel="noreferrer">
                  <strong>MyIMR Link</strong>
                </a>
                <br />
                <em>*ASIMS website to check for medical requirements/status (CAC required)</em><br />
                <br />
                <a href="https://asimsimr.health.mil/imr/Login_Unit.aspx" target="_blank" className="text-decoration-none" rel="noreferrer">
                  <strong>Unit POC’s ASIMS Login</strong>
                </a>
                <br />
                <em>*ASIMS website for Unit Health/Deployment Monitors (CAC required)</em><br />
              </Col>
            </Card>
          </div>

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
            <Card className="rounded-4 p-3 mt-4 text-center color3">
              <h4>Resources</h4>
              <Col className="text-start">
                <a href="mailto:154mdg.gcc@us.af.mil" className="text-decoration-none">
                  <strong>154 MDG Org Box</strong>
                </a>
                <br />
                <em>*Send any questions or documents to our org box</em><br />
                <br />
                <a href="https://usaf.dps.mil/sites/HIANG/154WG/154MDG" target="_blank" className="text-decoration-none" rel="noreferrer">
                  <strong>154 MDG SharePoint</strong>
                </a>
                <br />
                <em>*MDG resources (CAC required)</em><br />
                <br />
                <a href="https://asimsimr.health.mil/imr/myimr.aspx" target="_blank" className="text-decoration-none" rel="noreferrer">
                  <strong>MyIMR Link</strong>
                </a>
                <br />
                <em>*ASIMS website to check for medical requirements/status (CAC required)</em><br />
                <br />
                <a href="https://asimsimr.health.mil/imr/Login_Unit.aspx" target="_blank" className="text-decoration-none" rel="noreferrer">
                  <strong>Unit POC’s ASIMS Login</strong>
                </a>
                <br />
                <em>*ASIMS website for Unit Health/Deployment Monitors (CAC required)</em><br />
              </Col>
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
