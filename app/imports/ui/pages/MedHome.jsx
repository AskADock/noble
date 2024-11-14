import React from 'react';
import { Row, Col, Container, Card, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Questions } from '../../api/question/QuestionCollection';
import { FAQ } from '../../api/faq/FAQCollection';
import { Categories } from '../../api/category/CategoryCollection';
import MedHomeQuestion from '../components/MedHomeQuestion';
import MedHomeStats from '../components/MedHomeStats';
import LoadingSpinner from '../components/LoadingSpinner';

const MedHome = () => {
  // subscribe to the questions collection
  const { ready, questionsNotAnswer, questions, faq, categories } = useTracker(() => {
    const subscription = Questions.subscribeQuestionNotAnswer();
    const subscription2 = Questions.subscribeQuestionAll();
    const subscription3 = FAQ.subscribeFAQ();
    const subscription4 = Categories.subscribeCategoryAll();
    const rdy = subscription.ready() && subscription2.ready() && subscription3.ready() && subscription4.ready();
    const questionsNotAnswerItems = Questions.find({ answered: false }).fetch();
    const questionsItems = Questions.find().fetch();
    const faqItems = FAQ.find().fetch();
    const categoriesItems = Categories.find().fetch();
    return {
      questionsNotAnswer: questionsNotAnswerItems,
      questions: questionsItems,
      faq: faqItems,
      categories: categoriesItems,
      ready: rdy,
    };
  }, []);

  return (ready ? (
    <Container fluid className="med-staff-home-background p-0">
      <Container fluid className="color1">
        <Row className="py-4 text-center">
          <h1 className="text-white">Medical Home</h1>
        </Row>
      </Container>
      <Container>
        <Row className="mb-3 justify-content-center">
          <MedHomeStats allQuestions={questions} questionsNotAnswer={questionsNotAnswer} faq={faq} />
        </Row>
        <Row className="align-content-center justify-content-center mb-3">
          <Col xs={12} md={4} className="align-content-center justify-content-center">
            <Card className="p-1 text-center rounded-4">
              <Card.Title>
                <h3>Create A Flyer</h3>
              </Card.Title>
              <Card.Body>
                <Button href="/flyer-management">
                  Flyer Generator
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={4} className="align-content-center justify-content-center">
            <Card className="p-1 text-center rounded-4">
              <Card.Title>
                <h3>Feedback</h3>
              </Card.Title>
              <Card.Body>
                <Button href="/feedback-management">
                  Feedback
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <MedHomeQuestion questions={questionsNotAnswer} categories={categories} />
        </Row>
      </Container>
    </Container>
  ) : (
    <LoadingSpinner message="Loading Med Home" />
  ));
};

export default MedHome;
