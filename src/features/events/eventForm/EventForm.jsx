/* global google */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { listenToEvents } from '../eventActions';

import { categoryData } from '../../../app/api/categoryOptions';
import { Segment, Header, Button, Confirm } from 'semantic-ui-react';
import {
  listenToEventFromFirestore,
  updateEventInFirestore,
  addEventToFirestore,
  cancelEventToggle,
} from '../../../app/firestore/firestoreService';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import MyDateInput from '../../../app/common/form/MyDateInput';
import MyPlaceInput from '../../../app/common/form/MyPlaceInput';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc';

function EventForm({ match, history }) {
  const [loadingCancel, setLoadingCancel] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const dispatch = useDispatch();

  const selectedEvent = useSelector(state =>
    state.event.events.find(evt => evt.id === match.params.id),
  );
  const { loading, error } = useSelector(state => state.async);

  const initialValues = selectedEvent ?? {
    title: '',
    category: '',
    description: '',
    city: {
      address: '',
      latLng: null,
    },
    venue: {
      address: '',
      latLng: null,
    },
    date: '',
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('You must provide a title'),
    category: Yup.string().required('You must provide a category'),
    description: Yup.string().required('You must provide a description'),
    city: Yup.object().shape({
      address: Yup.string().required('City is required'),
    }),
    venue: Yup.object().shape({
      address: Yup.string().required('Venue is required'),
    }),
    date: Yup.string().required(),
  });

  async function handleFormsSubmit(values, setSubmitting) {
    try {
      selectedEvent
        ? await updateEventInFirestore(values)
        : await addEventToFirestore(values);
      setSubmitting(false);
      history.push('/events');
    } catch (error) {
      toast.error(error.message);
      setSubmitting(false);
    }
  }

  async function handleCancelToggle(event) {
    setConfirmOpen(false);
    setLoadingCancel(true);
    try {
      await cancelEventToggle(event);
      setLoadingCancel(false);
    } catch (error) {
      setLoadingCancel(true);
      toast.error(error.message);
    }
  }

  useFirestoreDoc({
    shouldExecute: !!match.params.id,
    query: () => listenToEventFromFirestore(match.params.id),
    data: event => dispatch(listenToEvents([event])),
    deps: [match.params.id, dispatch],
  });

  if (loading) return <LoadingComponent content="Loading event..." />;

  if (error) return <Redirect to="/error" />;

  return (
    <Segment clearing>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) =>
          handleFormsSubmit(values, setSubmitting)
        }
        validationSchema={validationSchema}
      >
        {({ isSubmitting, dirty, isValid, values }) => (
          <Form className="ui form">
            <Header sub color="teal" content="Event Details" />
            <MyTextInput name="title" placeholder="Event title" />
            <MySelectInput
              name="category"
              placeholder="Category"
              options={categoryData}
            />
            <Header sub color="teal" content="Event Location Details" />
            <MyTextArea name="description" placeholder="Description" rows={3} />
            <MyPlaceInput name="city" placeholder="City" />
            <MyPlaceInput
              name="venue"
              disabled={!values.city.latLng}
              placeholder="Venue"
              options={{
                location: new google.maps.LatLng(values.city.latLng),
                radius: 1000,
                types: ['establishment'],
              }}
            />
            <MyDateInput
              name="date"
              placeholderText="Event Date"
              timeFormat="HH:mm"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm a"
            />
            {selectedEvent && (
              <Button
                loading={loadingCancel}
                type="button"
                floated="left"
                color={selectedEvent.isCancelled ? 'green' : 'red'}
                content={
                  selectedEvent.isCancelled
                    ? 'Reactivate event'
                    : 'Cancel Event'
                }
                onClick={() => setConfirmOpen(true)}
              />
            )}
            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type="submit"
              floated="right"
              positive
              content="Submit"
            />
            <Button
              disabled={isSubmitting}
              as={Link}
              to="/events"
              type="submit"
              floated="right"
              content="Cancel"
            />
          </Form>
        )}
      </Formik>
      <Confirm
        content={
          selectedEvent?.isCancelled
            ? 'This will reactivate the event. Are you sure?'
            : 'This will cancel the event. Are you sure?'
        }
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => handleCancelToggle(selectedEvent)}
      />
    </Segment>
  );
}

export default EventForm;
