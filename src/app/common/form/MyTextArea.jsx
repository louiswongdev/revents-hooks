import React from 'react';
import { useField } from 'formik';
import { FormField, Label } from 'semantic-ui-react';

function MyTextArea({ label, ...props }) {
  const [field, meta] = useField(props);

  return (
    // !! if there is a string (there is an error) we want it to be true
    <FormField error={meta.touched && !!meta.error}>
      <label>{label}</label>
      <textarea {...field} {...props} />
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </FormField>
  );
}

export default MyTextArea;
