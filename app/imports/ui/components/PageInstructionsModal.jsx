import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Modal } from 'react-bootstrap';
import { QuestionCircle } from 'react-bootstrap-icons';

const PageInstructionsModal = ({ page }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Set the instructions based on the page
  let pageTitle;
  let instructions;

  switch (page) {
  case 'FAQPage':
    pageTitle = 'FAQ';
    instructions = (
      <div>
        <p>
          <strong>Find answers to frequently asked questions or your submitted questions here.</strong>
        </p>
        <h5>
          Tabs:
        </h5>
        <p>
          Click the <strong>FAQ tab</strong> for frequently asked questions. Click the <strong>Question tab</strong> to view user submitted questions.
        </p>
        <h5>
          Accessing Questions:
        </h5>
        <p>
          Click on the question to view the answer.
        </p>
        <h5>
          Filter/Search:
        </h5>
        <p>
          Click on the filter dropdown to filter questions by category. Use the search bar to search for specific questions.
        </p>
      </div>
    );
    break;
  case 'questionCompassPage':
    pageTitle = 'Question Compass';
    instructions = (
      <div>
        <p>
          <strong>Chat with our AI assistant and find relevant medical information.</strong>
        </p>
        <p>
          Noble is an AI Chatbot trained on Air Force Medical Standards and procedures.
        </p>
        <h5>
          Interacting with Noble:
        </h5>
        <p>
          Type your question in the chat box and press the send button to talk to Noble. Noble will respond with relevant information.
          <strong> Please be patient as Noble thinks.</strong>
        </p>
        <p>
          <strong>
            Noble is not a substitute for professional medical advice. Noble is here to provide guidance based on our available resources.
          </strong>
        </p>
      </div>
    );
    break;
  case 'askADocPage':
    pageTitle = 'Ask A Doc';
    instructions = (
      <div>
        <h2>Contact Us</h2>
        <p>Here is how you can contact us.</p>
      </div>
    );
    break;
  default:
    pageTitle = 'Not Found';
    instructions = (
      <div>
        <h2>No Instructions Available</h2>
        <p>No instructions available for this page.</p>
      </div>
    );
  }

  return (
    <>
      <QuestionCircle size="5vh" onClick={handleShow} style={{ cursor: 'pointer' }} />
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="color1">
          <Modal.Title>
            <h2 className="text-white"><strong>Instructions for {pageTitle}</strong></h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            {instructions}
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

PageInstructionsModal.propTypes = {
  page: PropTypes.string.isRequired,
};

export default PageInstructionsModal;
