import React, { useState } from 'react';
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

  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar bg="light" expand="lg" sticky="top" className="Navbar">
      <Container className="text-center">
        <Navbar.Brand id={COMPONENT_IDS.NAVBAR_LANDING_BRAND} href="/">
          <h1>
            <strong>NOBLE</strong>
          </h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={COMPONENT_IDS.NAVBAR_COLLAPSE} onClick={() => setExpanded(!expanded)} />
        <Navbar.Collapse id={COMPONENT_IDS.NAVBAR_COLLAPSE} in={expanded}>
          <Nav className="mx-auto">
            {/* Show links for users not logged in */}
            {(!Roles.userIsInRole(Meteor.userId(), [ROLE.USER])) && (!Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN])) ? (
              [
                <Nav.Link id={COMPONENT_IDS.NAVBAR_LANDING} as={NavLink} to="/" onClick={() => setExpanded(false)}>Home</Nav.Link>,
                <Nav.Link id={COMPONENT_IDS.NAVBAR_FAQ} as={NavLink} to="/faq" onClick={() => setExpanded(false)}>FAQ</Nav.Link>,
                <Nav.Link id={COMPONENT_IDS.NAVBAR_QUESTION_COMPASS} as={NavLink} to="/question-compass" onClick={() => setExpanded(false)}>Question Compass</Nav.Link>,
                <Nav.Link id={COMPONENT_IDS.NAVBAR_ASK_A_DOC} as={NavLink} to="/ask-a-doc" onClick={() => setExpanded(false)}>Ask A Doc</Nav.Link>,
                <Nav.Link id={COMPONENT_IDS.NAVBAR_FEEDBACK} as={NavLink} to="/feedback" onClick={() => setExpanded(false)}>Feedback</Nav.Link>,
              ]
            ) : ''}

            {/* Show links for users logged in */}
            {Roles.userIsInRole(Meteor.userId(), [ROLE.USER]) ? (
              [
                <Nav.Link id={COMPONENT_IDS.NAVBAR_MED_HOME} as={NavLink} to="/home" onClick={() => setExpanded(false)}>Med Home</Nav.Link>,
                <NavDropdown id={COMPONENT_IDS.NAVBAR_QUESTIONS_DROPDOWN} title="Questions" key="questions-dropdown">
                  <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_FAQ_MANAGEMENT} as={NavLink} to="/faq-management" onClick={() => setExpanded(false)}>
                    FAQ Management
                  </NavDropdown.Item>
                  <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_QUESTION_MANAGEMENT} as={NavLink} to="/question-management" onClick={() => setExpanded(false)}>
                    Question Management
                  </NavDropdown.Item>
                  <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_PASSCODE_MANAGEMENT} as={NavLink} to="/passcode-management" onClick={() => setExpanded(false)}>
                    Passcode Management
                  </NavDropdown.Item>
                </NavDropdown>,
                <Nav.Link id={COMPONENT_IDS.NAVBAR_FLYER_MANAGEMENT} as={NavLink} to="/flyer-management" onClick={() => setExpanded(false)}>Flyer Management</Nav.Link>,
                <Nav.Link id={COMPONENT_IDS.NAVBAR_FEEDBACK_MANAGEMENT} as={NavLink} to="/feedback-management" onClick={() => setExpanded(false)}>Feedback Management</Nav.Link>,
              ]
            ) : ''}

            {/* Show admin links */}
            {Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN]) ? (
              [
                <Nav.Link id={COMPONENT_IDS.NAVBAR_MED_HOME} as={NavLink} to="/home" onClick={() => setExpanded(false)}>Med Home</Nav.Link>,
                <NavDropdown id={COMPONENT_IDS.NAVBAR_QUESTIONS_DROPDOWN} title="Questions" key="questions-dropdown">
                  <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_FAQ_MANAGEMENT} as={NavLink} to="/faq-management" onClick={() => setExpanded(false)}>
                    FAQ Management
                  </NavDropdown.Item>
                  <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_QUESTION_MANAGEMENT} as={NavLink} to="/question-management" onClick={() => setExpanded(false)}>
                    Question Management
                  </NavDropdown.Item>
                  <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_PASSCODE_MANAGEMENT} as={NavLink} to="/passcode-management" onClick={() => setExpanded(false)}>
                    Passcode Management
                  </NavDropdown.Item>
                </NavDropdown>,
                <NavDropdown id={COMPONENT_IDS.NAVBAR_OTHER_DROPDOWN} title="Other" key="other-dropdown">
                  <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_FLYER_MANAGEMENT} as={NavLink} to="/flyer-management" onClick={() => setExpanded(false)}>
                    Flyer Management
                  </NavDropdown.Item>
                  <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_FEEDBACK_MANAGEMENT} as={NavLink} to="/feedback-management" onClick={() => setExpanded(false)}>
                    Feedback Management
                  </NavDropdown.Item>
                </NavDropdown>,
                <NavDropdown id={COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN} title="Manage" key="manage-dropdown">
                  <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN_DATABASE} key="manage-database" as={NavLink} to="/manage-database" onClick={() => setExpanded(false)}>
                    <CloudDownload /> Database
                  </NavDropdown.Item>
                  <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN_USERS} key="manage-users" as={NavLink} to="/user-management" onClick={() => setExpanded(false)}>
                    <PersonFill /> Users
                  </NavDropdown.Item>
                </NavDropdown>,
              ]
            ) : ''}
          </Nav>
          <Nav className="justify-content-end">
            {currentUser === '' ? (
              <NavDropdown id={COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN} title="Login">
                <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN_SIGN_IN} as={NavLink} to="/signin" onClick={() => setExpanded(false)}>
                  <PersonFill /> Sign in
                </NavDropdown.Item>
                {/* <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN_SIGN_UP} as={NavLink} to="/signup"> */}
                {/*  <PersonPlusFill /> Sign up */}
                {/* </NavDropdown.Item> */}
              </NavDropdown>
            ) : (
              <NavDropdown id={COMPONENT_IDS.NAVBAR_CURRENT_USER} title={currentUser}>
                <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_SIGN_OUT} as={NavLink} to="/signout" onClick={() => setExpanded(false)}>
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
