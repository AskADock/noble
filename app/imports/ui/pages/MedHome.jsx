import React from 'react';
import { Row, Col, Container, Card, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Questions } from '../../api/question/QuestionCollection';
import { FAQ } from '../../api/faq/FAQCollection';
import { Categories } from '../../api/category/CategoryCollection';
import MedHomeStats from '../components/MedHomeStats';
import Header from '../components/Header';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';
import QuestionCardManagement from '../components/QuestionCardManagement';

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
          <MedHomeStats faq={faq} allQuestions={questions} questionsNotAnswer={questionsNotAnswer} />
        </Row>
        <Row className="align-content-center justify-content-center mt-2">
          {/* Create A Flyer and Feedback */}
          <Col xs={12} md={3} className="justify-content-center">
            <Card className="text-center rounded-4 mb-3">
              <Card.Body>
                <h3>Create A Flyer</h3>
                <Button href="/flyer-management" className="text-center">
                  <h5>Flyer Generator</h5>
                </Button>
              </Card.Body>
            </Card>
            <Card className="text-center rounded-4">
              <Card.Body>
                <h3>Feedback</h3>
                <Button href="/feedback-management" className="text-center">
                  <h5>Feedback</h5>
                </Button>
              </Card.Body>
            </Card>
          </Col>
          {/* Recent Questions */}
          <Col xs={12} md={9} className="align-content-center justify-content-center">
            <Card className="rounded-4 pt-3 text-center">
              <Card.Title>
                <h2>Recent Questions</h2>
              </Card.Title>
              <Card.Body>
                {questions.length > 0 ? (
                  <>
                    {questionsNotAnswer.slice(0, 5).map((item) => (
                      <QuestionCardManagement key={item._id} questions={item} categories={categories} collection="Questions" />
                    ))}
                    {questionsNotAnswer.length > 5 && (
                      <Button href="/question-management" className="text-center">
                        View More
                      </Button>
                    )}
                  </>
                ) : <p>No Questions!</p>}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  ) : (
    <LoadingSpinner message="Medical Home" />
  ));
};

export default MedHome;
