import React, { useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useTracker } from 'meteor/react-meteor-data';
import { Questions } from '../../api/question/QuestionCollection';
import { Categories } from '../../api/category/CategoryCollection';
import { defineMethod } from '../../api/base/BaseCollection.methods';
import LoadingSpinner from '../components/LoadingSpinner';

export const AskADoc = () => {
  const formRef = useRef(null);

  // Fetch categories with useTracker
  const { ready, categories } = useTracker(() => {
    const subscription = Categories.subscribeCategoryAll();
    const rdy = subscription.ready();
    const categoryItems = Categories.find().fetch();
    return {
      categories: categoryItems,
      ready: rdy,
    };
  }, []);

  // Dynamically create schema after categories are fetched
  const formSchema = ready
    ? new SimpleSchema({
      category: {
        type: String,
      },
      passcode: {
        type: String,
        allowedValues: ['Always-Ready-Always-There'],
      },
      question: {
        type: String,
      },
    })
    : null;

  const bridge = ready ? new SimpleSchema2Bridge(formSchema) : null;

  // Handle form submission
  const submit = (data) => {
    const { question, category } = data;
    const collectionName = Questions.getCollectionName();
    const definitionData = { question, category };

    defineMethod.callPromise({ collectionName, definitionData })
      .then(() => {
        swal('Success', 'Your question has been submitted!', 'success');
        formRef.current.reset(); // Reset form after success
      })
      .catch((error) => swal('Error', error.message, 'error'));
  };

  return ready && bridge ? (
    <Container fluid className="color1">
      <Row className="py-4 justify-content-center">
        <Col className="col-10 align-content-center">
          <Row className="py-5 color1 justify-content-center">
            <Col xs={12} md={8} lg={6} className="text-center text-white">
              <h1>Ask A Doc</h1>
              <p>Anonymously ask a Doctor any question. Your answer will appear in the FAQ page soon.</p>
            </Col>
          </Row>
          <Row className="justify-content-center" style={{ width: '100%', marginBottom: '20px' }}>
            <Col xs={12} md={10} lg={8} className="text-center">
              <AutoForm ref={formRef} schema={bridge} onSubmit={submit}>
                <Row>
                  <Col xs={12} md={6}>
                    <SelectField name="category" placeholder="Select a category" />
                  </Col>
                  <Col xs={12} md={6}>
                    <TextField name="passcode" placeholder="Passcode" />
                  </Col>
                </Row>
                <LongTextField name="question" placeholder="Type your question here...." style={{ height: '200px', resize: 'none' }} />
                <SubmitField value="Submit" />
                <ErrorsField />
              </AutoForm>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  ) : (
    <LoadingSpinner message="Loading Categories" />
  );
};

export default AskADoc;
