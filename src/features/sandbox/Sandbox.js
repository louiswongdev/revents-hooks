import React from 'react';
import { useSelector } from 'react-redux';

function Sandbox() {
  const data = useSelector(state => state.data);
  return (
    <>
      <h1>Testing</h1>
      <h3>The data is: {data} </h3>
    </>
  );
}

export default Sandbox;
