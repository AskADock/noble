import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { FAQ } from '../../api/faq/FAQCollection';
import { Questions } from '../../api/question/QuestionCollection';
import { Categories } from '../../api/category/CategoryCollection';
import FAQFilter from '../components/FAQFilter';
import DisclaimerModal from '../components/DisclaimerModal';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';
import PageInstructionsModal from '../components/PageInstructionsModal';

const FrequentlyAskedQuestions = () => {
  // Subscribe to the FAQ collection.
  const { ready, faq, question, categories } = useTracker(() => {
    const subscription = FAQ.subscribeFAQ();
    const subscription2 = Questions.subscribeQuestionAll();
    const subscription3 = Categories.subscribeCategoryAll();
    const rdy = subscription.ready() && subscription2.ready() && subscription3.ready();
    const FAQItems = FAQ.find().fetch();
    const questionItems = Questions.find({ answered: true }).fetch();
    const categoryItems = Categories.find().fetch();
    // console.log(FAQItems);
    // console.log(questionItems);
    // console.log(categoryItems);
    return {
      faq: FAQItems,
      question: questionItems,
      categories: categoryItems,
      ready: rdy,
    };
  });

  return (ready ? (
    <Container fluid id={PAGE_IDS.FAQ} className="faq-background p-0">
      <DisclaimerModal />
      <Container fluid className="color1">
        <Row className="py-4 text-center text-white text-shadow justify-content-center">
          <Col xs="auto">
            <h1>
              <strong>Frequently Asked Questions</strong>
            </h1>
            <h4>
              First Stop for Quick Answers
            </h4>
          </Col>
          <Col xs="auto" className="align-content-center">
            <PageInstructionsModal page="FAQPage" />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            <Row>
              <FAQFilter faq={faq} categories={categories} questions={question} />
            </Row>
          </Col>
        </Row>
      </Container>
    </Container>
  ) : (
    <LoadingSpinner message="Loading FAQ" />
  ));
};
export default FrequentlyAskedQuestions;
