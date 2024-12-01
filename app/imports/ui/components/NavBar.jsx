import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, CloudDownload, PersonFill } from 'react-bootstrap-icons';
import { ROLE } from '../../api/role/Role';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

const NavBar = () => {
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
    isStaff: Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN, 'staff']),
  }), []);

  return (
    <Navbar bg="light" expand="lg" sticky="top" className="Navbar">
      <Container className="text-center">
        <Navbar.Brand id={COMPONENT_IDS.NAVBAR_LANDING_BRAND} href="/">
          <h1>
            <strong>NOBLE</strong>
          </h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={COMPONENT_IDS.NAVBAR_COLLAPSE} />
        <Navbar.Collapse id={COMPONENT_IDS.NAVBAR_COLLAPSE}>
          <Nav className="mx-auto">
            {/* Show links for users not logged in */}
            {(!Roles.userIsInRole(Meteor.userId(), [ROLE.USER])) && (!Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN])) ? (
              [
                <Nav.Link key="home" id={COMPONENT_IDS.NAVBAR_LANDING} as={NavLink} to="/">Home</Nav.Link>,
                <Nav.Link key="faq" id={COMPONENT_IDS.NAVBAR_FAQ} as={NavLink} to="/faq">FAQ</Nav.Link>,
                <Nav.Link key="question-compass" id={COMPONENT_IDS.NAVBAR_QUESTION_COMPASS} as={NavLink} to="/question-compass">Question Compass</Nav.Link>,
                <Nav.Link key="ask-a-doc" id={COMPONENT_IDS.NAVBAR_ASK_A_DOC} as={NavLink} to="/ask-a-doc">Ask A Doc</Nav.Link>,
                <Nav.Link key="feedback" id={COMPONENT_IDS.NAVBAR_FEEDBACK} as={NavLink} to="/feedback">Feedback</Nav.Link>,
              ]
            ) : ''}

            {/* Show links for users logged in */}
            {Roles.userIsInRole(Meteor.userId(), [ROLE.USER]) ? (
              [
                <Nav.Link key="med-home" id={COMPONENT_IDS.NAVBAR_MED_HOME} as={NavLink} to="/home">Med Home</Nav.Link>,
                <Nav.Link key="faq-management" id={COMPONENT_IDS.NAVBAR_FAQ_MANAGEMENT} as={NavLink} to="/faq-management">FAQ Management</Nav.Link>,
                <Nav.Link key="question-management" id={COMPONENT_IDS.NAVBAR_QUESTION_MANAGEMENT} as={NavLink} to="/question-management">Question Management</Nav.Link>,
                <Nav.Link key="passcode-management" id={COMPONENT_IDS.NAVBAR_PASSCODE_MANAGEMENT} as={NavLink} to="/passcode-management">Passcode Management</Nav.Link>,
                <Nav.Link key="flyer-management" id={COMPONENT_IDS.NAVBAR_FLYER_MANAGEMENT} as={NavLink} to="/flyer-management">Flyer Management</Nav.Link>,
                <Nav.Link key="feedback-management" id={COMPONENT_IDS.NAVBAR_FEEDBACK_MANAGEMENT} as={NavLink} to="/feedback-management">Feedback Management</Nav.Link>,
              ]
            ) : ''}

            {/* Show admin links */}
            {Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN]) ? (
              [
                <Nav.Link key="med-home" id={COMPONENT_IDS.NAVBAR_MED_HOME} as={NavLink} to="/home">Med Home</Nav.Link>,
                <NavDropdown key="manage-dropdown" id={COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN} title="Question Manage">
                  <NavDropdown.Item key="faq-management" id={COMPONENT_IDS.NAVBAR_FAQ_MANAGEMENT} as={NavLink} to="/faq-management">FAQ Management</NavDropdown.Item>
                  <NavDropdown.Item key="question-management" id={COMPONENT_IDS.NAVBAR_QUESTION_MANAGEMENT} as={NavLink} to="/question-management">Question Management</NavDropdown.Item>
                  <NavDropdown.Item key="passcode-management" id={COMPONENT_IDS.NAVBAR_PASSCODE_MANAGEMENT} as={NavLink} to="/passcode-management">Passcode Management</NavDropdown.Item>
                </NavDropdown>,
                <Nav.Link key="flyer-management" id={COMPONENT_IDS.NAVBAR_FLYER_MANAGEMENT} as={NavLink} to="/flyer-management">Flyer Management</Nav.Link>,
                <Nav.Link key="feedback-management" id={COMPONENT_IDS.NAVBAR_FEEDBACK_MANAGEMENT} as={NavLink} to="/feedback-management">Feedback Management</Nav.Link>,
                <NavDropdown key="manage-dropdown-2" id={COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN} title="Manage">
                  <NavDropdown.Item key="manage-database" id={COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN_DATABASE} as={NavLink} to="/manage-database">
                    <CloudDownload /> Database
                  </NavDropdown.Item>
                </NavDropdown>,
              ]
            ) : ''}
          </Nav>
          <Nav className="justify-content-end">
            {currentUser === '' ? (
              <NavDropdown key="login" id={COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN} title="Login">
                <NavDropdown.Item key="signin" id={COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN_SIGN_IN} as={NavLink} to="/signin">
                  <PersonFill /> Sign in
                </NavDropdown.Item>
                {/* <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN_SIGN_UP} as={NavLink} to="/signup"> */}
                {/*  <PersonPlusFill /> Sign up */}
                {/* </NavDropdown.Item> */}
              </NavDropdown>
            ) : (
              <NavDropdown key="signout" id={COMPONENT_IDS.NAVBAR_CURRENT_USER} title={currentUser}>
                <NavDropdown.Item key="signout" id={COMPONENT_IDS.NAVBAR_SIGN_OUT} as={NavLink} to="/signout">
                  <BoxArrowRight /> Sign out
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
