import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { openModal } from '../../app/common/modals/modalReducer';

function Sandbox() {
  const dispatch = useDispatch();
  const data = useSelector(state => state.data);
  return (
    <>
      <h1>Testing</h1>
      <h3>The data is: {data} </h3>
      <Button
        onClick={() =>
          dispatch(openModal({ modalType: 'TestModal', modalProps: { data } }))
        }
        content="open modal"
        color="teal"
      />
    </>
  );
}

export default Sandbox;
