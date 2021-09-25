import React from 'react';
import _ from 'lodash';
import { useAppDispatch } from '../../hooks';
import { setGrades, setGradesLoaded } from '../../features/grades/gradesSlice';

// Components
import Uploader from '../Uploader';

const HomePage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const grades = localStorage.getItem('grades') || '';

  if (_.isEmpty(grades)) return <Uploader />;

  dispatch(setGrades(JSON.parse(grades)));
  dispatch(setGradesLoaded(true));
  return <></>;
};

export default HomePage;
