import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import swal from 'sweetalert';
import moment from 'moment';
import { ZipZap } from 'meteor/udondan:zipzap';
import { PAGE_IDS } from '../utilities/PageIDs';
import { dumpDatabaseMethod } from '../../api/base/BaseCollection.methods';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import Header from '../components/Header';

const ManageDatabase = () => {
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
  return (
    <Container fluid className="p-0" id={PAGE_IDS.MANAGE_DATABASE}>
      <Header
        title="Manage Database"
        subtitle="Dump the database"
        pageInstructions=""
        background="color1"
      />
      <Container>
        <Row className="py-5 justify-content-center">
          <Col md={6}>
            <Button id={COMPONENT_IDS.MANGAGE_DATABASE_DUMP} onClick={() => submit()}>Dump Database</Button>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default ManageDatabase;
