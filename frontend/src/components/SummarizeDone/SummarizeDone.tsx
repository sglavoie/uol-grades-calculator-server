import React from 'react';
import { selectGradesData } from '../../features/grades/gradesSlice';
import { useAppSelector } from '../../hooks';
import { useFetchGet, useFetchPost } from '../../hooks/useFetch';
import { summarizeDoneResponse } from '../../types';

const renderSummary = (state: summarizeDoneResponse): JSX.Element => {
  return (
    <div>
      {state.modules.map((module) => (
        <div key={module.module_name} className="border border-white p-4 m-4">
          <div className="font-semibold text-indigo-400">
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
      <div>weighted_average: {state.weighted_average}</div>
      <div>unweighted_average: {state.unweighted_average}</div>
      <div>weighted_ects: {state.weighted_ects}</div>
      <div>unweighted_ects: {state.unweighted_ects}</div>
      <div>weighted_us: {state.weighted_us}</div>
      <div>unweighted_us: {state.unweighted_us}</div>
      <div>weighted_class: {state.weighted_class}</div>
      <div>weighted_gpa_us: {state.weighted_gpa_us}</div>
      <div>weighted_gpa_uk: {state.weighted_gpa_uk}</div>
      <div>credits_done: {state.credits_done}</div>
      <div>percentage_done: {state.percentage_done}</div>
    </div>
  );
};

const SummarizeDone = (): JSX.Element => {
  const grades = useAppSelector(selectGradesData);
  const { state, error, errorMsg, loading } =
    useFetchPost<summarizeDoneResponse>('/summarize/done', grades);

  if (error) return <div>Error: {errorMsg}</div>;
  if (loading) return <div></div>;
  if (!state?.modules)
    return <div>No modules done. Good luck in your journey!</div>;
  return renderSummary(state);
};

export default React.memo(SummarizeDone);
