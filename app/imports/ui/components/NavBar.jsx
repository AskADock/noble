import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Navbar, Nav, NavDropdown, Image } from 'react-bootstrap';
import { BoxArrowRight, CloudDownload, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';
import { ROLE } from '../../api/role/Role';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

const NavBar = () => {
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
    isStaff: Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN, 'staff']),
  }), []);

  return (
    <Navbar bg="light" expand="lg">
      <Container className="text-start"> {/* Aligns everything to the start (left) */}
        <Navbar.Brand id={COMPONENT_IDS.NAVBAR_LANDING_PAGE}>
          <Image src="/images/Noble-Logo.png" alt="Home Image" style={{ maxWidth: '6vh' }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={COMPONENT_IDS.NAVBAR_COLLAPSE} />
        <Navbar.Collapse id={COMPONENT_IDS.NAVBAR_COLLAPSE}>
          <Nav className="me-auto"> {/* No centering, aligned to the left */}
            {!Roles.userIsInRole(Meteor.userId(), [ROLE.USER]) ? (
              [<Nav.Link id={COMPONENT_IDS.NAVBAR_HOME} as={NavLink} to="/">Home</Nav.Link>,
                <Nav.Link id={COMPONENT_IDS.NAVBAR_FAQ} as={NavLink} to="/faq">FAQ</Nav.Link>,
                <Nav.Link id={COMPONENT_IDS.NAVBAR_QUESTION_COMPASS} as={NavLink} to="/question-compass">Question Compass</Nav.Link>,
                <Nav.Link id={COMPONENT_IDS.NAVBAR_ASK_A_DOC} as={NavLink} to="/ask-a-doc">Ask A Doc</Nav.Link>]
            ) : ''}

            {/* Show admin or staff-only links */}
            {Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN]) ? (
              [<Nav.Link id={COMPONENT_IDS.NAVBAR_LIST_STUFF_ADMIN} as={NavLink} to="/admin" key="admin">Admin</Nav.Link>,
                <NavDropdown id={COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN} title="Manage" key="manage-dropdown">
                  <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN_DATABASE} key="manage-database" as={NavLink} to="/manage-database">
                    <CloudDownload /> Database
                  </NavDropdown.Item>
                  <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN_FAQ_MANAGEMENT} key="manage-faq" as={NavLink} to="/faq-management">
                    FAQ Management
                  </NavDropdown.Item>
                </NavDropdown>]
            ) : ''}

            {Roles.userIsInRole(Meteor.userId(), [ROLE.USER]) ? (
              <Nav.Link id={COMPONENT_IDS.NAVBAR_LIST_STUFF} as={NavLink} to="/home">Med Home</Nav.Link>
            ) : ''}

            {/* Staff-specific links */}
            {Roles.userIsInRole(Meteor.userId(), ['staff']) ? (
              <NavDropdown id={COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN_STAFF} title="Staff Manage" key="staff-manage-dropdown">
                <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN_FAQ_MANAGEMENT} key="staff-manage-faq" as={NavLink} to="/faq-management">
                  FAQ Management
                </NavDropdown.Item>
                <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN_DATABASE_STAFF} key="staff-manage-database" as={NavLink} to="/manage-database">
                  <CloudDownload /> Manage Database
                </NavDropdown.Item>
              </NavDropdown>
            ) : ''}
          </Nav>
          <Nav className="justify-content-end">
            {currentUser === '' ? (
              <NavDropdown id={COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN} title="Login">
                <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN_SIGN_IN} as={NavLink} to="/signin">
                  <PersonFill /> Sign in
                </NavDropdown.Item>
                <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN_SIGN_UP} as={NavLink} to="/signup">
                  <PersonPlusFill /> Sign up
                </NavDropdown.Item>
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
