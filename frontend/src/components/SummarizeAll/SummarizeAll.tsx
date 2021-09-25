import React from 'react';
import useFetch from '../../hooks/useFetch';
import { summarizeAllResponse } from '../../types';

const renderSummary = (state: summarizeAllResponse): JSX.Element => {
  return (
    <>
      <div style={{ fontWeight: 'bold', marginBottom: '1em' }}>Done</div>
      <div style={{ padding: '1em' }}>
        {state.done.modules.map((module) => (
          <div
            key={module.module_name}
            style={{ border: '1px solid white', padding: '1em', margin: '1em' }}
          >
            <div style={{ fontWeight: 'bold', color: '#a67dff' }}>
              {module.module_name}
            </div>
            <div>completion_date: {module.completion_date}</div>
            <div>final_score: {module.final_score}</div>
            <div>final_weight: {module.final_weight}</div>
            <div>midterm_score: {module.midterm_score}</div>
            <div>midterm_weight: {module.midterm_weight}</div>
            <div>module_score: {module.module_score}</div>
            <div>level: {module.level}</div>
          </div>
        ))}
        <div>weighted_average: {state.done.weighted_average}</div>
        <div>unweighted_average: {state.done.unweighted_average}</div>
        <div>weighted_ects: {state.done.weighted_ects}</div>
        <div>unweighted_ects: {state.done.unweighted_ects}</div>
        <div>weighted_us: {state.done.weighted_us}</div>
        <div>unweighted_us: {state.done.unweighted_us}</div>
        <div>weighted_class: {state.done.weighted_class}</div>
        <div>weighted_gpa_us: {state.done.weighted_gpa_us}</div>
        <div>weighted_gpa_uk: {state.done.weighted_gpa_uk}</div>
        <div>credits_done: {state.done.credits_done}</div>
        <div>percentage_done: {state.done.percentage_done}</div>
      </div>
      <div
        style={{ fontWeight: 'bold', marginBottom: '1em', marginTop: '3em' }}
      >
        Progress
      </div>
      <div style={{ padding: '1em' }}>
        {state.progress.modules.map((module) => (
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
        <div>weighted_average: {state.progress.weighted_average}</div>
        <div>unweighted_average: {state.progress.unweighted_average}</div>
      </div>
    </>
  );
};

const SummarizeAll = (): JSX.Element => {
  const { state, error, errorMsg, loading } = useFetch<summarizeAllResponse>(
    '/summarize/all'
  );

  if (error) return <div>Error: {errorMsg}</div>;
  if (loading) return <div></div>;

  return renderSummary(state);
};

export default React.memo(SummarizeAll);
