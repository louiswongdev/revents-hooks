import React from 'react';
import { Button, Container } from 'semantic-ui-react';
import EventDashboard from '../../features/events/eventDashboard/EventDashboard';
import NavBar from '../../features/nav/NavBar';

function App() {
  return (
    <>
      <h1>Re-vents</h1>
      <NavBar />
      <Container className="main">
        <EventDashboard />
      </Container>
    </>
  );
}

export default App;
