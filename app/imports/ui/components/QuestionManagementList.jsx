import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Container, Form, Pagination, Tabs, Tab } from 'react-bootstrap';
import Fuse from 'fuse.js';
import QuestionCardManagement from './QuestionCardManagement';

const QuestionManagementList = ({ questions, unansweredQuestions, category }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const questionsPerPage = 10;

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
    setSearchPerformed(!!event.target.value);
  };

  const allQuestions = [...questions, ...unansweredQuestions];
  let displayedQuestions = allQuestions;

  if (searchPerformed && allQuestions.length > 0) {
    const fuseOptions = {
      isCaseSensitive: false,
      shouldSort: true,
      threshold: 0.2,
      keys: ['question', 'answer', 'category'],
    };
    const fuse = new Fuse(allQuestions, fuseOptions);
    const result = fuse.search(searchQuery);
    displayedQuestions = result.map((item) => item.item);
  }

  const filteredQuestions = displayedQuestions.filter(
    (item) => (activeTab === 'all' ? item.answer : activeTab === 'unanswered' && !item.answer),
  );

  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = filteredQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);
  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);

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
          />
        </Form.Group>
      </Container>

      <Row className="text-start mt-2 py-1 text-color">
        <h4>{searchPerformed ? `Total Results: ${filteredQuestions.length}` : `Latest Questions: ${currentQuestions.length}`}</h4>
      </Row>
      <Row>
        <Col>
          <Tabs
            activeKey={activeTab}
            onSelect={(tab) => {
              setActiveTab(tab);
              setCurrentPage(1); // Reset to the first page on tab change
            }}
            id="faq-tabs"
            className="mb-3"
            justify
          >
            <Tab eventKey="all" title="Questions">
              {currentQuestions.length > 0 ? currentQuestions.map((item) => (
                <QuestionCardManagement
                  key={item._id}
                  questions={item}
                  categories={category}
                  collection="Questions"
                />
              )) : <p>No results found</p>}
            </Tab>
            <Tab eventKey="unanswered" title="Unanswered Questions">
              {currentQuestions.length > 0 ? currentQuestions.map((item) => (
                <QuestionCardManagement
                  key={item._id}
                  questions={item}
                  categories={category}
                  collection="Questions"
                />
              )) : <p>No results found</p>}
            </Tab>
          </Tabs>
        </Col>
      </Row>

      {/* Pagination buttons */}
      {totalPages > 0 && (
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

QuestionManagementList.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    question: PropTypes.string,
    answer: PropTypes.string,
    category: PropTypes.string,
    answered: PropTypes.bool,
    timestamp: PropTypes.instanceOf(Date),
  })).isRequired,
  unansweredQuestions: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    question: PropTypes.string,
    answer: PropTypes.string,
    category: PropTypes.string,
    answered: PropTypes.bool,
    timestamp: PropTypes.instanceOf(Date),
  })).isRequired,
  category: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string,
  })).isRequired,
};

export default QuestionManagementList;
