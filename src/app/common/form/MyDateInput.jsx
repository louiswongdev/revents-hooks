import React from 'react';
import { useField, useFormikContext } from 'formik';
import { FormField, Label } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function MyDateInput({ label, ...props }) {
  const { setFieldValue } = useFormikContext();
  const [field, meta, helpers] = useField(props);
  // const { setValue, setTouched } = helpers;

  return (
    // !! if there is a string (there is an error) we want it to be true
    <FormField error={meta.touched && !!meta.error}>
      <label>{label}</label>
      <DatePicker
        {...field}
        {...props}
        selected={(field.value && new Date(field.value)) || null}
        onChange={value => setFieldValue(field.name, value)}
      />
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </FormField>
  );
}

export default MyDateInput;
