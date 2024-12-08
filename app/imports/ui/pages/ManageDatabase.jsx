import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import swal from 'sweetalert';
import moment from 'moment';
import { ZipZap } from 'meteor/udondan:zipzap';
import { PAGE_IDS } from '../utilities/PageIDs';
import { dumpDatabaseMethod } from '../../api/base/BaseCollection.methods';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { Categories } from '../../api/category/CategoryCollection';
import { FAQ } from '../../api/faq/FAQCollection';
import { Questions } from '../../api/question/QuestionCollection';
import { Passcodes } from '../../api/passcode/PasscodeCollection';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import Header from '../components/Header';
import LoadingSpinner from '../components/LoadingSpinner';

const ManageDatabase = () => {
  // Fetch Categories FAQ, Questions, Passcodes, and UserProfiles
  const { ready, categories, faqs, questions, passcodes, userProfiles } = useTracker(() => {
    const subscription1 = Categories.subscribeCategoryAll();
    const subscription2 = FAQ.subscribeFAQ();
    const subscription3 = Questions.subscribeQuestionAll();
    const subscription4 = Passcodes.subscribeAdmin();
    const subscription5 = UserProfiles.subscribeUserAdmin();
    return {
      ready: subscription1.ready() && subscription2.ready() && subscription3.ready() && subscription4.ready()
        && subscription5.ready(),
      categories: Categories.find().fetch(),
      faqs: FAQ.find().fetch(),
      questions: Questions.find().fetch(),
      passcodes: Passcodes.find().fetch(),
      userProfiles: UserProfiles.find().fetch(),
    };
  }, []);

  const databaseFileDateFormat = 'YYYY-MM-DD-HH-mm-ss';

  const submit = () => {
    dumpDatabaseMethod.callPromise()
      .catch(error => swal('Error', error.message, 'error'))
      .then(result => {
        const zip = new ZipZap();
        const dir = 'matp-db';
        const fileName = `${dir}/${moment(result.timestamp).format(databaseFileDateFormat)}.json`;
        zip.file(fileName, JSON.stringify(result, null, 2));
        zip.saveAs(`${dir}.zip`);
      });
  };
  return (ready ? (
    <Container fluid className="p-0 med-staff-background" id={PAGE_IDS.MANAGE_DATABASE}>
      <Header
        title="Manage Database"
        subtitle="Dump the database"
        pageInstructions="manageDatabasePage"
        background="color1"
      />
      <Container>
        <Row className="py-5 px-1">
          <h2 className="text-dark-blue">
            <strong>Database Information</strong>
          </h2>
          <Card className="rounded-4 text-center p-0">
            <Card.Body>
              <Row className="py-3">
                <Col>
                  <Card.Title>Categories</Card.Title>
                  <Card.Text>{categories.length}</Card.Text>
                </Col>
                <Col>
                  <Card.Title>FAQs</Card.Title>
                  <Card.Text>{faqs.length}</Card.Text>
                </Col>
                <Col>
                  <Card.Title>Questions</Card.Title>
                  <Card.Text>{questions.length}</Card.Text>
                </Col>
                <Col>
                  <Card.Title>Passcodes</Card.Title>
                  <Card.Text>{passcodes.length}</Card.Text>
                </Col>
                <Col>
                  <Card.Title>Users</Card.Title>
                  <Card.Text>{userProfiles.length}</Card.Text>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer className="text-end">
              <Button id={COMPONENT_IDS.MANGAGE_DATABASE_DUMP} onClick={() => submit()}>
                Dump Database
              </Button>
            </Card.Footer>
          </Card>
        </Row>
      </Container>
    </Container>
  ) : (
    <LoadingSpinner message="Manage Database" />
  ));
};

export default ManageDatabase;
