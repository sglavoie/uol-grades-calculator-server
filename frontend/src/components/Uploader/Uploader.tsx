import React from 'react';
import { useAppDispatch } from '../../hooks';
import { setGradesLoaded } from '../../features/grades/gradesSlice';

const Uploader = (): JSX.Element => {
  const dispatch = useAppDispatch();
  return (
    <button onClick={() => dispatch(setGradesLoaded(true))}>
      Load grades...
    </button>
  );
};

export default Uploader;
