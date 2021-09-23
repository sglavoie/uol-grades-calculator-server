import React from 'react';
import { useAppSelector } from '../../hooks';
import { selectGradesLoaded } from '../../features/grades/gradesSlice';

// Components
import Uploader from '../Uploader';

const HomePage = (): JSX.Element => {
  const loaded = useAppSelector(selectGradesLoaded);
  if (!loaded) return <Uploader />;
  return <></>;
};

export default HomePage;
