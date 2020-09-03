import React from 'react';
import { Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import EventDashboard from '../../features/events/eventDashboard/EventDashboard';
import EventDetailedPage from '../../features/events/eventDetailed/EventDetailedPage';
import EventForm from '../../features/events/eventForm/EventForm';
import HomePage from '../../features/home/HomePage';
import NavBar from '../../features/nav/NavBar';

import { Container } from 'semantic-ui-react';
import Sandbox from '../../features/sandbox/Sandbox';
import ModalManager from '../common/modals/ModalManager';
import ErrorComponent from '../common/errors/ErrorComponent';
import AccountPage from '../../features/auth/AccountPage';
import { useSelector } from 'react-redux';
import LoadingComponent from './LoadingComponent';
import ProfilePage from '../../features/profiles/profilePage/ProfilePage';

function App() {
  // use unique key property from location to force UI to refresh EventForm if going from
  // editing --> creating new form. Otherwise, old values from editing will still exist in
  // input fields on create form
  const { key } = useLocation();
  const { initialized } = useSelector(state => state.async);

  if (!initialized) return <LoadingComponent content="Loading app..." />;

  return (
    <>
      <ModalManager />
      <ToastContainer position="bottom-right" hideProgressBar />
      <Route path="/" exact component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container className="main">
              <Route path="/sandbox" exact component={Sandbox} />
              <Route path="/events" exact component={EventDashboard} />
              <Route path="/events/:id" component={EventDetailedPage} />
              <Route
                path={['/createEvent', '/manage/:id']}
                component={EventForm}
                key={key}
              />
              <Route path="/account" component={AccountPage} />
              <Route path="/profile/:id" component={ProfilePage} />
              <Route path="/error" component={ErrorComponent} />
            </Container>
          </>
        )}
      />
    </>
  );
}

export default App;
