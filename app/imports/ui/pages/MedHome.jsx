import React from 'react';
import { Row, Col, Container, Card, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Questions } from '../../api/question/QuestionCollection';
import { FAQ } from '../../api/faq/FAQCollection';
import { Categories } from '../../api/category/CategoryCollection';
import MedHomeQuestion from '../components/MedHomeQuestion';
import MedHomeStats from '../components/MedHomeStats';
import Header from '../components/Header';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';

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
    <Container fluid className="med-staff-background p-0" id={PAGE_IDS.MED_HOME}>
      <Header
        title="Medical Home"
        subtitle="Welcome to the Medical Home page"
        background="color1"
        pageInstructions="medHome"
      />
      <Container>
        <Row className="mt-3 justify-content-center">
          <MedHomeStats allQuestions={questions} questionsNotAnswer={questionsNotAnswer} faq={faq} />
        </Row>
        <Row className="align-content-center justify-content-center mt-2">
          <Col xs={12} md={4} className="align-content-center justify-content-center">
            <Card className="p-2 text-center rounded-4">
              <Card.Title>
                <h3>Create A Flyer</h3>
              </Card.Title>
              <Card.Body>
                <Button href="/flyer-management" className="text-center">
                  <h5>Flyer Generator</h5>
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={4} className="align-content-center justify-content-center">
            <Card className="p-2 text-center rounded-4">
              <Card.Title>
                <h3>Feedback</h3>
              </Card.Title>
              <Card.Body>
                <Button href="/feedback-management" className="text-center">
                  <h5>Feedback</h5>
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="justify-content-center mt-2 mb-3">
          <MedHomeQuestion questions={questionsNotAnswer} categories={categories} />
        </Row>
      </Container>
    </Container>
  ) : (
    <LoadingSpinner message="Loading Med Home" />
  ));
};

export default MedHome;
