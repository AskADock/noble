import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Modal } from 'react-bootstrap';
import { QuestionCircle } from 'react-bootstrap-icons';

// This component displays a modal with instructions for a specific page.
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
          Click the <strong>FAQ tab</strong> for frequently asked questions. Click the <strong>Ask A Doc tab</strong> to view user submitted questions.
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
        <p>
          <strong>Anonymously ask a Doctor health-related questions.</strong>
        </p>
        <h5>
          Submitting a Question:
        </h5>
        <p>
          Select a category, enter the authentication code, and type your question. Click the submit button to submit your question.
        </p>
        <h5>
          Authentication:
        </h5>
        <p>
          Authentication codes are provided by the medical team. If you do not have a authentication code, please contact the medical team.
        </p>
        <h5>
          Finding Answers:
        </h5>
        <p>
          After a doctor responds to your question, the answer will appear in the <strong>FAQ</strong> page in the <strong>Ask A Doc Tab</strong>.
        </p>
      </div>
    );
    break;
  case 'medHome':
    pageTitle = 'Medical Home';
    instructions = (
      <div>
        <p>
          <strong>Medical Home provides a summary of the medical team&apos;s activities.</strong>
        </p>
        <h5>
          Stats:
        </h5>
        <p>
          View the total number of questions, questions answered, and questions not answered.
        </p>
        <h5>
          Flyer Generator:
        </h5>
        <p>
          Click the <strong>Flyer Generator</strong> button to create a generic flyer with the current passcode.
        </p>
        <h5>
          Feedback:
        </h5>
        <p>
          Click the <strong>Feedback</strong> button to view feedback from users.
        </p>
        <h5>
          Recent Questions:
        </h5>
        <p>
          View the most recent questions submitted by users. Click the reply button to answer the question. Click the delete button to delete the question.
        </p>
      </div>
    );
    break;
  case 'FAQManagementPage':
    pageTitle = 'FAQ Management';
    instructions = (
      <div>
        <p>
          <strong>Manage the Frequently Asked Questions (FAQ) database.</strong>
        </p>
        <h5>
          Adding a Question:
        </h5>
        <p>
          Click the <strong>Add FAQ</strong> button to add a new question to the FAQ database.
        </p>
        <h5>
          Editing a Question:
        </h5>
        <p>
          Click the <strong>Edit</strong> button to edit the question. Click the <strong>Delete</strong> button to delete the question.
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
  case 'questionManagementPage':
    pageTitle = 'Question Management';
    instructions = (
      <div>
        <p>
          <strong>Manage user submitted questions.</strong>
        </p>
        <h5>
          Answering a Question:
        </h5>
        <p>
          Click the <strong>Reply</strong> button to answer the question. Click the <strong>Delete</strong> button to delete the question.
        </p>
        <h5>
          Filter/Search:
        </h5>
        <p>
          Click on the filter dropdown to filter questions by category. Use the search bar to search for specific questions.
        </p>
        <h5>
          Publish/Unpublish Questions:
        </h5>
        <p>
          Answered questions are published in the <strong>FAQ</strong> page. Unanswered questions are <strong>not</strong> published.
        </p>
        <h5>
          Questions Tab:
        </h5>
        <p>
          Click the <strong>Questions</strong> tab to view <strong>answered</strong> submitted questions. These questions are published in the <strong>FAQ</strong> page.
        </p>
        <h5>
          Unanswered Tab:
        </h5>
        <p>
          Click the <strong>Unanswered</strong> tab to view <strong>unanswered</strong> submitted questions. These questions are <strong>not</strong> published.
        </p>
      </div>
    );
    break;
  case 'categoryManagementPage':
    pageTitle = 'Category Management';
    instructions = (
      <div>
        <p>
          <strong>Manage the categories</strong>
        </p>
        <h5>
          Adding a Category:
        </h5>
        <p>
          Click the <strong>Add Category</strong> button to add a new category.
        </p>
        <h5>
          Editing a Category:
        </h5>
        <p>
          Click the <strong>Edit</strong> button to edit the category. This will edit all questions in this category.
        </p>
        <h5>
          Deleting a Category:
        </h5>
        <p>
          Click the <strong>Delete</strong> button to delete the category. This does <strong>NOT</strong> delete the questions in this category.
        </p>
      </div>
    );
    break;
  case 'passcodeManagementPage':
    pageTitle = 'Passcode Management';
    instructions = (
      <div>
        <p>
          <strong>Manage the passcodes used to submit questions.</strong>
        </p>
        <p>
          Passcodes are required to submit questions to the medical group. This is to ensure that only authorized users can submit questions.
        </p>
        <h5>
          Generate New Passcode:
        </h5>
        <p>
          Click the <strong>Generate Passcode</strong> button to create a new passcode.
        </p>
        <h5>
          Editing a Passcode:
        </h5>
        <p>
          Click the <strong>Edit</strong> button to edit the passcode. Click the <strong>Delete</strong> button to delete the passcode.
        </p>
        <h5>
          Passcode Count:
        </h5>
        <p>
          View the total number of passcodes generated.
        </p>
      </div>
    );
    break;
  case 'flyerManagementPage':
    pageTitle = 'Flyer Management';
    instructions = (
      <div>
        <p>
          <strong>Print Ask A Doc Flyers.</strong>
        </p>
        <h5>
          Select a Passcode:
        </h5>
        <p>
          Select a passcode from the dropdown list. Click the <strong>Print Flyer</strong> button to print the flyer.
        </p>
        <h5>
          Printable Area:
        </h5>
        <p>
          The printable area contains the flyer information. The flyer contains the Noble QR code and the passcode.
        </p>
      </div>
    );
    break;
  case 'feedbackManagementPage':
    pageTitle = 'Feedback Management';
    instructions = (
      <div>
        <p>
          <strong>Manage user feedback.</strong>
        </p>
        <h5>
          Deleting Feedback:
        </h5>
        <p>
          Click the <strong>Delete</strong> button to delete the feedback.
        </p>
      </div>
    );
    break;
  case 'manageDatabasePage':
    pageTitle = 'Manage Database';
    instructions = (
      <div>
        <p>
          <strong>Manage the database.</strong>
        </p>
        <h5>
          Download Database:
        </h5>
        <p>
          Click the <strong>Dump Database</strong> button to download the database.
        </p>
      </div>
    );
    break;
  case 'userManagementPage':
    pageTitle = 'User Management';
    instructions = (
      <div>
        <p>
          <strong>Add and Remove users.</strong>
        </p>
        <p>
          User accounts are used to access the system. User accounts are created by the admin. To change passwords, delete the user and create a new user.
        </p>
        <h5>
          Add User:
        </h5>
        <p>
          Click the <strong>Add User</strong> button to add a new user.
        </p>
        <h5>
          Current Users:
        </h5>
        <p>
          View the current users. Click the <strong>Delete</strong> button to delete a user.
        </p>
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
      <QuestionCircle size="6vh" onClick={handleShow} style={{ cursor: 'pointer' }} />
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
