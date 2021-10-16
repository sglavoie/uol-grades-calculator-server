import React from 'react';
import { selectGrades } from '../../features/grades/gradesSlice';
import { useAppSelector } from '../../hooks';
import { useFetchPost } from '../../hooks/useFetch';
import { plotModulesResponse } from '../../types';

const PlotModules = (): JSX.Element => {
  const grades = useAppSelector(selectGrades);
  const { state, error, errorMsg, loading } = useFetchPost<plotModulesResponse>(
    '/plot/modules',
    grades
  );

  if (error) return <div>Error: {errorMsg}</div>;
  if (loading) return <div>Generating plot...</div>;

  if (!state.ok) {
    return <div>{state.error}</div>;
  }

  return (
    <div className="mt-12 text-center">
      <img src={state.src} className="max-w-screen-xl inline-block" />
    </div>
  );
};

export default PlotModules;
