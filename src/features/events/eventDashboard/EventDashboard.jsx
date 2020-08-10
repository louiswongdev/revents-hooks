import React from 'react';
import { Grid } from 'semantic-ui-react';
import EventList from './EventList';

function EventDashboard() {
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>right Column</h2>
      </Grid.Column>
    </Grid>
  );
}

export default EventDashboard;
