import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Questions } from '../../api/question/QuestionCollection';
import { Categories } from '../../api/category/CategoryCollection';
import QuestionManagementFilter from '../components/QuestionManagementFilter';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';

const QuestionManagement = () => {
  // Subscribe to the question collection.
  const { ready, questionsAnswer, questionNotAnswer, categories } = useTracker(() => {
    const subscription = Questions.subscribeQuestionAnswer();
    const subscription2 = Questions.subscribeQuestionNotAnswer();
    const subscription3 = Categories.subscribeCategoryAll();
    const rdy = subscription.ready() && subscription2.ready() && subscription3.ready();
    const questionsItems = Questions.find({ answered: true }).fetch();
    const questionsNotAnswerItems = Questions.find({ answered: false }).fetch();
    const categoriesItems = Categories.find().fetch();
    return {
      questionsAnswer: questionsItems,
      questionNotAnswer: questionsNotAnswerItems,
      categories: categoriesItems,
      ready: rdy,
    };
  }, []);

  return (ready ? (
    <Container fluid className="p-0 med-staff-background" id={PAGE_IDS.QUESTION_MANAGEMENT}>
      <Container fluid className="color1">
        <Row className="py-4 text-center">
          <Col>
            <h1 className="text-white">Question Management</h1>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            <QuestionManagementFilter unansweredQuestions={questionNotAnswer} answeredQuestions={questionsAnswer} categories={categories} />
          </Col>
        </Row>
      </Container>
    </Container>
  ) : (
    <LoadingSpinner />
  ));
};

export default QuestionManagement;
