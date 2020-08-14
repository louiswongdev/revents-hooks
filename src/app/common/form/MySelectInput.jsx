import React from 'react';
import { useField } from 'formik';
import { FormField, Label, Select } from 'semantic-ui-react';

function MySelectInput({ label, ...props }) {
  const [field, meta, helpers] = useField(props);
  const { setValue, setTouched } = helpers;

  return (
    // !! if there is a string (there is an error) we want it to be true
    <FormField error={meta.touched && !!meta.error}>
      <label>{label}</label>
      <Select
        clearable
        value={field.value || null}
        onChange={(e, data) => setValue(data.value)}
        onBlur={() => setTouched(true)}
        {...props}
      />
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </FormField>
  );
}

export default MySelectInput;
