import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import ModalWrapper from '../../app/common/modals/ModalWrapper';
import MyTextInput from '../../app/common/form/MyTextInput';
import { Button, Label, Divider } from 'semantic-ui-react';
import { closeModal } from '../../app/common/modals/modalReducer';
import { registerInFirebase } from '../../app/firestore/firebaseService';
import SocialLogin from './SocialLogin';

function RegisterForm() {
  const RegisterSchema = Yup.object().shape({
    displayName: Yup.string().required(),
    email: Yup.string().required().email(),
    password: Yup.string().required(),
  });
  const dispatch = useDispatch();
  return (
    <ModalWrapper size="mini" header="Register to Re-vents">
      <Formik
        initialValues={{ displayName: '', email: '', password: '' }}
        validationSchema={RegisterSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            await registerInFirebase(values);
            setSubmitting(false);
            dispatch(closeModal());
          } catch (error) {
            setSubmitting(false);
            setErrors({ auth: error.message });
          }
        }}
      >
        {({ isSubmitting, isValid, dirty, errors }) => (
          <Form className="ui form">
            <MyTextInput name="displayName" placeholder="DisplayName" />
            <MyTextInput name="email" placeholder="Email Address" />
            <MyTextInput
              name="password"
              placeholder="Password"
              type="password"
            />
            {errors.auth && (
              <Label
                basic
                color="red"
                style={{ marginBottom: 10 }}
                content={errors.auth}
              />
            )}
            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type="submit"
              fluid
              size="large"
              color="teal"
              content="Register"
            />
            <Divider horizontal>Or</Divider>
            <SocialLogin />
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
}

export default RegisterForm;
