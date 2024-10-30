import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { FAQ } from '../../api/faq/FAQCollection';
import { Questions } from '../../api/question/QuestionCollection';
import { Categories } from '../../api/category/CategoryCollection';
import FAQFilter from '../components/FAQFilter';
import LoadingSpinner from '../components/LoadingSpinner';

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
    <>
      <Container fluid className="color1">
        <Row className="py-4 text-center color1">
          <h1 className="text-white">Frequently Asked Questions</h1>
        </Row>
      </Container>
      <Container fluid className="faq-background">
        <Row className="justify-content-center mb-5">
          <Col className="col-11">
            <Row>
              <FAQFilter faq={faq} categories={categories} questions={question} />
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  ) : (
    <LoadingSpinner message="Loading FAQ" />
  ));
};
export default FrequentlyAskedQuestions;
