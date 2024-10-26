import React from 'react';
import { Card, Row, Table, Button, ButtonGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';

const MedHomeQuestion = ({ questions }) => (
  <Row className="my-2 align-content-center justify-content-center">
    <Card className="rounded-4 p-1">
      <Card.Title>
        <h2 className="text-center mt-2">Recent Questions</h2>
      </Card.Title>
      <Card.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th colSpan={1}>Category</th>
              <th colSpan={9}>Question</th>
              <th colSpan={2}>Options</th>
            </tr>
          </thead>
          <tbody>
            {questions.slice(-10).map((question) => (
              <tr key={question._id}>
                <td colSpan={1}>{question.category}</td>
                <td colSpan={9}>{question.question}</td>
                <td colSpan={2} className="text-center">
                  <ButtonGroup>
                    <Button variant="primary">
                      Reply
                    </Button>
                    <Button variant="danger">
                      Delete
                    </Button>
                  </ButtonGroup>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button>
          View More
        </Button>
      </Card.Body>
    </Card>
  </Row>
);

MedHomeQuestion.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    category: PropTypes.string,
    question: PropTypes.string,
    answer: PropTypes.string,
    answered: PropTypes.bool,
  })).isRequired,
};

export default MedHomeQuestion;
