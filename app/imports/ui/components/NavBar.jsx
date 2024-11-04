import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Navbar, Nav, NavDropdown, Image } from 'react-bootstrap';
import { BoxArrowRight, CloudDownload, PersonFill } from 'react-bootstrap-icons';
import { ROLE } from '../../api/role/Role';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

const NavBar = () => {
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
    isStaff: Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN, 'staff']),
  }), []);

  return (
    <Navbar bg="light" expand="lg">
      <Container className="text-start">
        <Navbar.Brand id={COMPONENT_IDS.NAVBAR_LANDING_PAGE} href="/">
          <Image src="/images/154_Logo.png" alt="Home Image" style={{ maxWidth: '5vh' }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={COMPONENT_IDS.NAVBAR_COLLAPSE} />
        <Navbar.Collapse id={COMPONENT_IDS.NAVBAR_COLLAPSE}>
          <Nav className="me-auto">
            {/* Show links for users not logged in */}
            {(!Roles.userIsInRole(Meteor.userId(), [ROLE.USER])) && (!Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN])) ? (
              [<Nav.Link id={COMPONENT_IDS.NAVBAR_HOME} as={NavLink} to="/">Home</Nav.Link>,
                <Nav.Link id={COMPONENT_IDS.NAVBAR_FAQ} as={NavLink} to="/faq">FAQ</Nav.Link>,
                <Nav.Link id={COMPONENT_IDS.NAVBAR_QUESTION_COMPASS} as={NavLink} to="/question-compass">Question Compass</Nav.Link>,
                <Nav.Link id={COMPONENT_IDS.NAVBAR_ASK_A_DOC} as={NavLink} to="/ask-a-doc">Ask A Doc</Nav.Link>,
                <Nav.Link id={COMPONENT_IDS.NAVBAR_FEEDBACK} as={NavLink} to="/feedback">Feedback</Nav.Link>]
            ) : ''}

            {/* Show links for users logged in */}
            {Roles.userIsInRole(Meteor.userId(), [ROLE.USER]) ? (
              [<Nav.Link id={COMPONENT_IDS.NAVBAR_MED_HOME} as={NavLink} to="/home">Med Home</Nav.Link>,
                <Nav.Link id={COMPONENT_IDS.NAVBAR_FAQ_MANAGEMENT} as={NavLink} to="/faq-management">FAQ Management</Nav.Link>,
                <Nav.Link id={COMPONENT_IDS.NAVBAR_QUESTION_MANAGEMENT} as={NavLink} to="/question-management">Question Management</Nav.Link>,
                <Nav.Link id={COMPONENT_IDS.NAVBAR_PASSCODE_MANAGEMENT} as={NavLink} to="/passcode-management">Passcode Management</Nav.Link>,
                <Nav.Link id={COMPONENT_IDS.NAVBAR_FEEDBACK_MANAGEMENT} as={NavLink} to="/feedback-management">Feedback Management</Nav.Link>]
            ) : ''}

            {/* Show admin links */}
            {Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN]) ? (
              [<Nav.Link id={COMPONENT_IDS.NAVBAR_MED_HOME} as={NavLink} to="/home">Med Home</Nav.Link>,
                <Nav.Link id={COMPONENT_IDS.NAVBAR_FAQ_MANAGEMENT} as={NavLink} to="/faq-management">FAQ Management</Nav.Link>,
                <Nav.Link id={COMPONENT_IDS.NAVBAR_QUESTION_MANAGEMENT} as={NavLink} to="/question-management">Question Management</Nav.Link>,
                <Nav.Link id={COMPONENT_IDS.NAVBAR_PASSCODE_MANAGEMENT} as={NavLink} to="/passcode-management">Passcode Management</Nav.Link>,
                <Nav.Link id={COMPONENT_IDS.NAVBAR_LIST_STUFF_ADMIN} as={NavLink} to="/admin" key="admin">Admin</Nav.Link>,
                <NavDropdown id={COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN} title="Manage" key="manage-dropdown">
                  <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN_DATABASE} key="manage-database" as={NavLink} to="/manage-database">
                    <CloudDownload /> Database
                  </NavDropdown.Item>
                </NavDropdown>]
            ) : ''}
          </Nav>
          <Nav className="justify-content-end">
            {currentUser === '' ? (
              <NavDropdown id={COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN} title="Login">
                <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN_SIGN_IN} as={NavLink} to="/signin">
                  <PersonFill /> Sign in
                </NavDropdown.Item>
                {/* <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN_SIGN_UP} as={NavLink} to="/signup"> */}
                {/*  <PersonPlusFill /> Sign up */}
                {/* </NavDropdown.Item> */}
              </NavDropdown>
            ) : (
              <NavDropdown id={COMPONENT_IDS.NAVBAR_CURRENT_USER} title={currentUser}>
                <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_SIGN_OUT} as={NavLink} to="/signout">
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
