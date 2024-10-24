import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, Container, Card, Pagination, Accordion, Badge } from 'react-bootstrap';
import Fuse from 'fuse.js';
/*
 * renders the searchBar, the faq questions passed in, as well as the pagination for the page.
 * @param theFAQs the faq question that needs to be rendered.
 */
const FAQList = ({ theFAQs }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const questionsPerPage = 9;

  const handleSearchChange = (faq) => {
    setSearchQuery(faq.target.value);
    setCurrentPage(1);
    setSearchPerformed(!!faq.target.value); // Set searchPerformed to true if search query is not empty
  };

  let displayedQuestions = theFAQs; // Default to all faqs

  if (searchPerformed && theFAQs.length > 0) {
    const fuseOptions = {
      isCaseSensitive: false,
      shouldSort: true,
      includeMatches: true,
      findAllMatches: true,
      useExtendedSearch: false,
      threshold: 0.2,
      keys: ['question', 'answer', 'category'],
    };

    const fuse = new Fuse(theFAQs, fuseOptions);
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
            placeholder="I want to know..."
            className="p-2"
            style={{ minWidth: '45vw', maxWidth: '50vw' }}
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Form.Group>
      </Container>

      {searchPerformed ? (
        <Row className="text-start mt-2 py-1 text-color">
          <h4>Total Results: {displayedQuestions.length}</h4>
        </Row>
      ) : (
        <Row className="text-start mt-2 py-1 text-color">
          <h4>Latest FAQ</h4>
        </Row>
      )}

      <Row>
        <Col>
          {currentQuestions.map((item) => (
            <Card className="my-2" key={item._id}>
              <Accordion>
                <Accordion.Item eventKey={item._id} className="p-2">
                  <Badge bg="primary" className="ms-auto">{item.category}</Badge>
                  <Accordion.Header>
                    <h5>{item.question}</h5>
                  </Accordion.Header>
                  <Accordion.Body>{item.answer}</Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Card>
          ))}
        </Col>
      </Row>

      {/* Pagination buttons */}
      {totalPages > 0 && (
        <Container className="d-flex justify-content-center">
          <Pagination>
            <Pagination.First onClick={() => paginate(1)} />
            <Pagination.Prev onClick={() => paginate(currentPage - 1)} />
            {Array.from({ length: totalPages }, (_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => paginate(currentPage + 1)} />
            <Pagination.Last onClick={() => paginate(totalPages)} />
          </Pagination>
        </Container>
      )}
    </Container>
  );
};

FAQList.propTypes = {
  theFAQs: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    question: PropTypes.string,
    answer: PropTypes.string,
    category: PropTypes.string,
  })).isRequired,
};

export default FAQList;
