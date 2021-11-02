import React from 'react';
import { selectGrades } from '../../features/grades/gradesSlice';
import { useAppSelector } from '../../hooks';
import { useFetchPost } from '../../hooks/useFetch';
import { plotModulesResponse } from '../../types';
import PlotModulesGraph from './PlotModulesGraph';
import PlotModulesOptions from './PlotModulesOptions';

const PlotModules = (): JSX.Element => {
  const [shouldDisplayGraph, setShouldDisplayGraph] = React.useState(false);
  const grades = useAppSelector(selectGrades);

  const fetchAndDisplayGraph = () => {
    const { state, error, errorMsg, loading } =
      useFetchPost<plotModulesResponse>('/plot/modules', {
        data: grades.data,
        options: grades.options,
      });
    if (error) return <div>Error: {errorMsg}</div>;
    if (loading) return <div>Generating plot...</div>;

    if (!state.ok) {
      return <div>{state.error}</div>;
    }

    return <PlotModulesGraph path={state.src || ''} />;
  };

  if (shouldDisplayGraph) {
    return fetchAndDisplayGraph();
  }

  return <PlotModulesOptions currentOptions={grades.options} />;
};

export default PlotModules;
