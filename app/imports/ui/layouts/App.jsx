import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { useTracker } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import FrequentlyAskedQuestions from '../pages/FAQ';
import QuestionCompass from '../pages/QuestionCompass';
import AskADocPage from '../pages/AskADoc';
import FeedbackPage from '../pages/FeedbackPage';
import Privacy from '../pages/Privacy';
import MedHome from '../pages/MedHome';
import QuestionManagement from '../pages/QuestionManagement';
import FAQManagement from '../pages/FAQManagement';
import CategoryManagement from '../pages/CategoryManagement';
import PasscodeManagement from '../pages/PasscodeManagement';
import FlyerManagement from '../pages/FlyerManagement';
import FeedbackManagement from '../pages/FeedbackManagement';
import NotFound from '../pages/NotFound';
import SignUp from '../pages/SignUp';
import SignOut from '../pages/SignOut';
import NavBar from '../components/NavBar';
import SignIn from '../pages/SignIn';
import NotAuthorized from '../pages/NotAuthorized';
import ManageDatabase from '../pages/ManageDatabase';
import UserManagement from '../pages/UserManagement';
import { ROLE } from '../../api/role/Role';
import LoadingSpinner from '../components/LoadingSpinner';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
const App = () => {
  const { ready, isAdmin } = useTracker(() => {
    const subscription = Roles.subscription.ready();
    const rdy = subscription;
    const loggedIn = Meteor.userId() !== null;
    const adminCheck = loggedIn ? Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN]) : false;
    return {
      ready: rdy,
      isAdmin: adminCheck,
    };
  }, []);
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="/faq" element={<FrequentlyAskedQuestions />} />
          <Route path="/question-compass" element={<QuestionCompass />} />
          <Route path="/ask-a-doc" element={<AskADocPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/home" element={<ProtectedRoute><MedHome /></ProtectedRoute>} />
          <Route path="/question-management" element={<ProtectedRoute><QuestionManagement /></ProtectedRoute>} />
          <Route path="/faq-management" element={<ProtectedRoute><FAQManagement /></ProtectedRoute>} />
          <Route path="/category-management" element={<ProtectedRoute><CategoryManagement /></ProtectedRoute>} />
          <Route path="/passcode-management" element={<ProtectedRoute><PasscodeManagement /></ProtectedRoute>} />
          <Route path="/flyer-management" element={<ProtectedRoute><FlyerManagement /></ProtectedRoute>} />
          <Route path="/feedback-management" element={<ProtectedRoute><FeedbackManagement /></ProtectedRoute>} />
          <Route path="/manage-database" element={<AdminProtectedRoute ready={ready} isAdmin={isAdmin}><ManageDatabase /></AdminProtectedRoute>} />
          <Route path="/user-management" element={<AdminProtectedRoute ready={ready} isAdmin={isAdmin}><UserManagement /></AdminProtectedRoute>} />
          <Route path="/notfound" element={<NotFound />} />
          <Route path="/notauthorized" element={<NotAuthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

/*
 * ProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ children }) => {
  const isLogged = Meteor.userId() !== null;
  // console.log('ProtectedRoute', isLogged);
  return isLogged ? children : <Navigate to="/signin" />;
};

/**
 * AdminProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ ready, children }) => {
  const isLogged = Meteor.userId() !== null;
  if (!isLogged) {
    return <Navigate to="/signin" />;
  }
  if (!ready) {
    return <LoadingSpinner message="" />;
  }
  const isAdmin = Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN]);
  // console.log('AdminProtectedRoute', isLogged, isAdmin);
  return (isLogged && isAdmin) ? children : <Navigate to="/notauthorized" />;
};

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

ProtectedRoute.defaultProps = {
  children: <Landing />,
};

// Require a component and location to be passed to each AdminProtectedRoute.
AdminProtectedRoute.propTypes = {
  ready: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

AdminProtectedRoute.defaultProps = {
  ready: false,
  children: <Landing />,
};

export default App;
