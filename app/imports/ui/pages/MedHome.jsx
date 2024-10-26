import React from 'react';
import { Row, Col, Container, Card } from 'react-bootstrap';
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
      <Container>
        <Row className="justify-content-center mb-5">
          <Col className="col-11">
            <Row>
              <MedHomeStats allQuestions={questions} questionsNotAnswer={questionsNotAnswer} faq={faq} />
            </Row>
            <Row>
              <Col>
                <Card>
                  <Card.Title>
                    <h3>FAQ Management</h3>
                  </Card.Title>
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
