import React from 'react';
import { FAQ } from '../../api/faq/FAQCollection';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row, Table, Button, Form } from 'react-bootstrap';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';
import swal from 'sweetalert';


/* Renders a table containing all of the FAQ documents. Allows admins to manage them. */
const FAQManagement = () => {
  const { faqs, ready } = useTracker(() => {
    // Get access to FAQ documents.
    const subscription = FAQ.subscribeFAQAdmin(); // Make sure this publication exists
    const rdy = subscription.ready();
    // Get the FAQ documents
    const items = FAQ.find({}).fetch();
    return {
      faqs: items,
      ready: rdy,
    };
  }, []);

  // State to handle editing
  const [editingFAQ, setEditingFAQ] = useState(null);
  const [editedQuestion, setEditedQuestion] = useState('');
  const [editedAnswer, setEditedAnswer] = useState('');
  const [editedCategory, setEditedCategory] = useState('');

  const deleteFAQ = (faqId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this FAQ entry!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        FAQ.remove(faqId);
        swal("FAQ entry has been deleted!", {
          icon: "success",
        });
      }
    });
  };

  // Function to handle editing
  const startEditFAQ = (faq) => {
    setEditingFAQ(faq._id);
    setEditedQuestion(faq.question);
    setEditedAnswer(faq.answer);
    setEditedCategory(faq.category);
  };

  const saveEditFAQ = (faqId) => {
    FAQ.update(faqId, {
      $set: {
        question: editedQuestion,
        answer: editedAnswer,
        category: editedCategory,
      },
    });
    setEditingFAQ(null); // Exit edit mode
    swal("FAQ entry has been updated!", {
      icon: "success",
    });
  };

  const cancelEdit = () => {
    setEditingFAQ(null); // Exit edit mode
  };

  return (ready ? (
    <Container id={PAGE_IDS.FAQ_MANAGEMENT} className="py-3">
      <Row className="justify-content-center">
        <Col md={10}>
          <Col className="text-center"><h2>FAQ Management (Admin)</h2></Col>
          <Table striped bordered hover>
            <thead>
            <tr>
              <th>Question</th>
              <th>Answer</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {faqs.map((faq) => (
              <tr key={faq._id}>
                {editingFAQ === faq._id ? (
                  <>
                    <td>
                      <Form.Control
                        type="text"
                        value={editedQuestion}
                        onChange={(e) => setEditedQuestion(e.target.value)}
                      />
                    </td>
                    <td>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        value={editedAnswer}
                        onChange={(e) => setEditedAnswer(e.target.value)}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="text"
                        value={editedCategory}
                        onChange={(e) => setEditedCategory(e.target.value)}
                      />
                    </td>
                    <td>
                      <Button variant="success" onClick={() => saveEditFAQ(faq._id)}>Save</Button>{' '}
                      <Button variant="secondary" onClick={cancelEdit}>Cancel</Button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{faq.question}</td>
                    <td>{faq.answer}</td>
                    <td>{faq.category}</td>
                    <td>
                      <Button variant="warning" onClick={() => startEditFAQ(faq)}>Edit</Button>{' '}
                      <Button variant="danger" onClick={() => deleteFAQ(faq._id)}>Delete</Button>
                    </td>
                  </>
                )}
              </tr>
            ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner message="Loading FAQs..." />);
};

export default FAQManagement;