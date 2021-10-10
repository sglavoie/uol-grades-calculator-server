import React from 'react';
import { selectGrades } from '../../features/grades/gradesSlice';
import { useAppSelector } from '../../hooks';
import { useFetchGet, useFetchPost } from '../../hooks/useFetch';
import { summarizeProgressResponse } from '../../types';

const renderProgressSummary = (
  state: summarizeProgressResponse
): JSX.Element => {
  return (
    <div style={{ padding: '1em' }}>
      {state.in_progress.modules.map((module) => (
        <div
          key={module.module_name}
          style={{ border: '1px solid white', padding: '1em', margin: '1em' }}
        >
          <div style={{ fontWeight: 'bold', color: '#a67dff' }}>
            {module.module_name}
          </div>
          <div>final_score: {module.final_score}</div>
          <div>final_weight: {module.final_weight}</div>
          <div>midterm_score: {module.midterm_score}</div>
          <div>midterm_weight: {module.midterm_weight}</div>
          <div>level: {module.level}</div>
        </div>
      ))}
      <div>weighted_average: {state.in_progress.weighted_average}</div>
      <div>unweighted_average: {state.in_progress.unweighted_average}</div>
      <div>
        average_in_progress_only_weighted:{' '}
        {state.average_in_progress_only.weighted}
      </div>
      <div>
        average_in_progress_only_unweighted:{' '}
        {state.average_in_progress_only.unweighted}
      </div>
    </div>
  );
};

const SummarizeProgress = (): JSX.Element => {
  const grades = useAppSelector(selectGrades);
  const { state, error, errorMsg, loading } =
    useFetchPost<summarizeProgressResponse>('/summarize/progress', grades);

  if (error) return <div>Error: {errorMsg}</div>;
  if (loading) return <div></div>;
  if (!state?.in_progress?.weighted_average)
    return <div>No modules in progress.</div>;
  return renderProgressSummary(state);
};

export default React.memo(SummarizeProgress);
