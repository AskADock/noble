import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, Container, Pagination, Badge, Tabs, Tab, Table } from 'react-bootstrap';
import Fuse from 'fuse.js';

const QuestionManagementList = ({ questions, unansweredQuestions }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const questionsPerPage = 9;

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
    setSearchPerformed(!!event.target.value);
  };

  let displayedQuestions = questions; // Default to all questions

  if (searchPerformed && questions.length > 0) {
    const fuseOptions = {
      isCaseSensitive: false,
      shouldSort: true,
      threshold: 0.2,
      keys: ['question', 'answer', 'category'],
    };

    const fuse = new Fuse(questions, fuseOptions);
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
      <Container className="d-flex justify-content-center">
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Search FAQs..."
            className="p-2"
            style={{ minWidth: '45vw', maxWidth: '50vw' }}
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Form.Group>
      </Container>

      <Row className="text-start mt-2 py-1 text-color">
        <h4>{searchPerformed ? `Total Results: ${displayedQuestions.length}` : 'Latest FAQ'}</h4>
      </Row>

      <Row>
        <Col>
          <Tabs defaultActiveKey="all" id="faq-tabs" className="mb-3">
            <Tab eventKey="all" title="Questions">
              {currentQuestions.length > 0 ? currentQuestions.map((item) => (
                <Table striped bordered hover key={item._id}>
                  <thead>
                  <tr>
                    <th>Question</th>
                    <th>Answer</th>
                    <th>Category</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>{item.question}</td>
                    <td>{item.answer || 'No answer available'}</td>
                    <td><Badge bg="primary">{item.category || 'Uncategorized'}</Badge></td>
                  </tr>
                  </tbody>
                </Table>
              )) : <p>No results found</p>}
            </Tab>
            <Tab eventKey="unanswered" title="Unanswered Questions">
              {unansweredQuestions.map((item) => (
                <Table striped bordered hover key={item._id}>
                  <thead>
                  <tr>
                    <th>Question</th>
                    <th>Answer</th>
                    <th>Category</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>{item.question}</td>
                    <td>{item.answer || 'No answer available'}</td>
                    <td><Badge bg="primary">{item.category || 'Uncategorized'}</Badge></td>
                  </tr>
                  </tbody>
                </Table>
              ))}
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
  })).isRequired,
  unansweredQuestions: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    question: PropTypes.string,
    answer: PropTypes.string,
    category: PropTypes.string,
  })).isRequired,
};

export default QuestionManagementList;
