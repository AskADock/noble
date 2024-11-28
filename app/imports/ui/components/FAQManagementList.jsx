import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Container, Form, Pagination, Badge, Card, ButtonGroup, Button } from 'react-bootstrap';
import Fuse from 'fuse.js';
import QuestionModal from './QuestionModal';

const FAQManagementList = ({ faqs, category }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const questionsPerPage = 10;

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
    setSearchPerformed(!!event.target.value);
  };

  const handleShowModal = (actionType, question) => {
    setAction(actionType);
    setSelectedQuestion(question);
    setShowModal(true);
  };

  const allQuestions = [...faqs];
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
    (item) => item.answer,
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
      <Container className="d-flex justify-content-center">
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Search Questions..."
            className="p-2"
            style={{ minWidth: '35vw', maxWidth: '45vw' }}
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Form.Group>
      </Container>

      <Row className="text-start mt-2 py-1 text-color">
        <h4>{searchPerformed ? `Total Results: ${filteredQuestions.length}` : 'Latest Questions'}</h4>
      </Row>
      <Row>
        <Col>
          {currentQuestions.length > 0 ? currentQuestions.map((item) => (
            <Card key={item._id} className="mb-3 rounded-4">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <Badge bg="primary" style={{ fontSize: '.9rem' }}>
                    {item.category}
                  </Badge>
                  <p className="text-muted mb-0 ms-2">
                    Updated: {item.timestamp.toLocaleDateString()}
                  </p>
                </div>
                <Card.Title>{item.question}</Card.Title>
                <Card.Text>{item.answer}</Card.Text>
                <Row className="justify-content-end">
                  <Col className="col-lg-4 col-xs-6 text-end">
                    <ButtonGroup>
                      <Button variant="success" onClick={() => handleShowModal('edit', item)}>Edit</Button>
                      <Button variant="danger" onClick={() => handleShowModal('delete', item)}>Delete</Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          )) : <p>No results found</p>}
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

      {/* Question Modal */}
      <QuestionModal
        show={showModal}
        collection="FAQ"
        action={action}
        question={selectedQuestion}
        category={category}
        onClose={() => setShowModal(false)}
      />
    </Container>
  );
};

FAQManagementList.propTypes = {
  faqs: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    answer: PropTypes.string,
    category: PropTypes.string,
    timestamp: PropTypes.instanceOf(Date),
  })).isRequired,
  category: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string,
  })).isRequired,
};

export default FAQManagementList;
