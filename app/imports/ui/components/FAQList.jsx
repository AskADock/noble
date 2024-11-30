import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Container, Form, Pagination, Tabs, Tab } from 'react-bootstrap';
import Fuse from 'fuse.js';
import QuestionCard from './QuestionCard';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

const FAQList = ({ faq, questions }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('faq');
  const questionsPerPage = 10;

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  // Select the array to display based on the active tab
  const dataToDisplay = activeTab === 'faq' ? faq : questions;

  // Apply search if there is a query
  let displayedQuestions = dataToDisplay;
  if (searchQuery) {
    const sanitizedData = dataToDisplay.map(item => ({
      ...item,
      question: item.question.replace(/['"]/g, ''),
      answer: item.answer.replace(/['"]/g, ''),
      category: item.category.replace(/['"]/g, ''),
    }));

    const fuse = new Fuse(sanitizedData, {
      isCaseSensitive: false,
      shouldSort: true,
      threshold: 0.3,
      keys: ['question', 'answer', 'category'],
    });
    const result = fuse.search(searchQuery);
    displayedQuestions = result.map((item) => item.item);
  }

  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = displayedQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);
  const totalPages = Math.ceil(displayedQuestions.length / questionsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <Container>
      {/* Search bar */}
      <Container className="justify-content-center p-0">
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Search Questions..."
            className="p-2"
            value={searchQuery}
            onChange={handleSearchChange}
            id={COMPONENT_IDS.FAQ_LIST_SEARCH_BAR}
          />
        </Form.Group>
      </Container>

      <Row className="text-start mt-2 py-1 text-color">
        <h4>{searchQuery ? `Total Results: ${displayedQuestions.length}` : 'Latest Questions'}</h4>
      </Row>
      <Row>
        <Col className="p-0">
          <Tabs
            activeKey={activeTab}
            onSelect={(tab) => {
              setActiveTab(tab);
              setCurrentPage(1); // Reset to the first page on tab change
            }}
            id="faq-tabs"
            className="mb-2"
            justify
          >
            <Tab eventKey="faq" title={`FAQ (${faq.length})`} className="">
              {currentQuestions.length > 0 ? currentQuestions.map((item) => (
                <QuestionCard question={item} key={item._id} />
              )) : <p>No results found</p>}
            </Tab>
            <Tab eventKey="answered" title={`Ask A Doc (${questions.length})`}>
              {currentQuestions.length > 0 ? currentQuestions.map((item) => (
                <QuestionCard question={item} key={item._id} />
              )) : <p>No results found</p>}
            </Tab>
          </Tabs>
        </Col>
      </Row>

      {/* Pagination buttons */}
      {totalPages > 1 && (
        <Container className="d-flex justify-content-center">
          <Pagination>
            <Pagination.First onClick={() => paginate(1)} disabled={currentPage === 1} />
            <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
            {Array.from({ length: totalPages }, (_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} />
            <Pagination.Last onClick={() => paginate(totalPages)} disabled={currentPage === totalPages} />
          </Pagination>
        </Container>
      )}
    </Container>
  );
};

FAQList.propTypes = {
  faq: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    question: PropTypes.string,
    answer: PropTypes.string,
    category: PropTypes.string,
    timestamp: PropTypes.instanceOf(Date),
  })).isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    question: PropTypes.string,
    answer: PropTypes.string,
    category: PropTypes.string,
    timestamp: PropTypes.instanceOf(Date),
  })).isRequired,
};

export default FAQList;
