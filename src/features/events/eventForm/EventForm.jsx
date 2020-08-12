import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { Segment, Header, Form, Button } from 'semantic-ui-react';
import cuid from 'cuid';
import { updateEvent, createEvent } from '../eventActions';

function EventForm({ match, history }) {
  const selectedEvent = useSelector(state =>
    state.event.events.find(evt => evt.id === match.params.id),
  );
  const dispatch = useDispatch();

  const initialValues = selectedEvent ?? {
    title: '',
    category: '',
    description: '',
    city: '',
    venue: '',
    date: '',
  };

  const [values, setValues] = useState(initialValues);

  function handleFormsSubmit() {
    selectedEvent
      ? dispatch(updateEvent({ ...selectedEvent, ...values }))
      : dispatch(
          createEvent({
            ...values,
            id: cuid(),
            hostedBy: 'bob',
            attendees: [],
            hostPhotoURL: '/assets/user.png',
          }),
        );
    history.push('/events');
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  }

  return (
    <Segment clearing>
      <Header content={selectedEvent ? 'Edit Event' : 'Create new event'} />
      <Form onSubmit={handleFormsSubmit}>
        <Form.Field>
          <input
            name="title"
            value={values.title}
            onChange={e => handleInputChange(e)}
            type="text"
            placeholder="Event title"
          />
        </Form.Field>
        <Form.Field>
          <input
            name="category"
            value={values.category}
            onChange={e => handleInputChange(e)}
            type="text"
            placeholder="Category"
          />
        </Form.Field>
        <Form.Field>
          <input
            name="description"
            value={values.description}
            onChange={e => handleInputChange(e)}
            type="text"
            placeholder="Description"
          />
        </Form.Field>
        <Form.Field>
          <input
            name="city"
            value={values.city}
            onChange={e => handleInputChange(e)}
            type="text"
            placeholder="City"
          />
        </Form.Field>
        <Form.Field>
          <input
            name="venue"
            value={values.venue}
            onChange={e => handleInputChange(e)}
            type="text"
            placeholder="Venue"
          />
        </Form.Field>
        <Form.Field>
          <input
            name="date"
            value={values.date}
            onChange={e => handleInputChange(e)}
            type="date"
            placeholder="Date"
          />
        </Form.Field>
        <Button type="submit" floated="right" positive content="Submit" />
        <Button
          as={Link}
          to="/events"
          type="submit"
          floated="right"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
}

export default EventForm;
