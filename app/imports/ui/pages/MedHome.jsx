import React from 'react';
import { Row, Col, Container, Card, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Questions } from '../../api/question/QuestionCollection';
import { FAQ } from '../../api/faq/FAQCollection';
import MedHomeQuestion from '../components/MedHomeQuestion';
import MedHomeStats from '../components/MedHomeStats';
import LoadingSpinner from '../components/LoadingSpinner';

const MedHome = () => {
  // subscribe to the questions collection
  const { ready, questionsNotAnswer, questions, faq } = useTracker(() => {
    const subscription = Questions.subscribeQuestionNotAnswer();
    const subscription2 = Questions.subscribeQuestionAll();
    const subscription3 = FAQ.subscribeFAQ();
    const rdy = subscription.ready() && subscription2.ready() && subscription3.ready();
    const questionsNotAnswerItems = Questions.find({ answered: false }).fetch();
    const questionsItems = Questions.find().fetch();
    const faqItems = FAQ.find().fetch();
    return {
      questionsNotAnswer: questionsNotAnswerItems,
      questions: questionsItems,
      faq: faqItems,
      ready: rdy,
    };
  }, []);

  return (ready ? (
    <>
      <Container fluid className="color1">
        <Row className="py-4 text-center color1">
          <h1 className="text-white">Medical Home</h1>
        </Row>
      </Container>
      <Container fluid className="med-staff-home-background">
        <Row className="align-content-center justify-content-center my-4">
          <Col xs={11} md={9}>
            <Row className="mb-3">
              <MedHomeStats allQuestions={questions} questionsNotAnswer={questionsNotAnswer} faq={faq} />
            </Row>
            <Row className="align-content-center justify-content-center mb-3">
              <Col xs={6} md={4} className="align-content-center justify-content-center">
                <Card className="p-1 text-center rounded-4">
                  <Card.Title>
                    <h3>FAQ Management</h3>
                  </Card.Title>
                  <Card.Body>
                    <Button href="/faq-management">
                      FAQs
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={6} md={4} className="align-content-center justify-content-center">
                <Card className="p-1 text-center rounded-4">
                  <Card.Title>
                    <h3>Question Management</h3>
                  </Card.Title>
                  <Card.Body>
                    <Button href="/question-management">
                      Questions
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row>
              <MedHomeQuestion questions={questionsNotAnswer} />
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  ) : (
    <LoadingSpinner message="Loading Med Home" />
  ));
};

export default MedHome;
