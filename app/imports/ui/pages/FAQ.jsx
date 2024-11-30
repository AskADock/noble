import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { FAQ } from '../../api/faq/FAQCollection';
import { Questions } from '../../api/question/QuestionCollection';
import { Categories } from '../../api/category/CategoryCollection';
import Header from '../components/Header';
import FAQFilter from '../components/FAQFilter';
import DisclaimerModal from '../components/DisclaimerModal';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';

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
      <Header
        title="Frequently Asked Questions"
        subtitle="First Stop for Quick Answers"
        background="color1"
        pageInstructions="FAQPage"
      />
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
    <LoadingSpinner message="Frequently Asked Questions" />
  ));
};
export default FrequentlyAskedQuestions;
