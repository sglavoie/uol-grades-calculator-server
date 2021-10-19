import React from 'react';
import { selectGradesData } from '../../features/grades/gradesSlice';
import { useAppSelector } from '../../hooks';
import { useFetchPost } from '../../hooks/useFetch';
import { checkScoreAccuracyResponse } from '../../types';

const CheckScoreAccuracy = (): JSX.Element => {
  const grades = useAppSelector(selectGradesData);
  const { state, error, errorMsg, loading } =
    useFetchPost<checkScoreAccuracyResponse>('/check/score-accuracy', grades);

  if (error) return <div>Error: {errorMsg}</div>;
  if (loading) return <></>;

  if (state.ok) {
    return (
      <div className="text-green-200">All module scores are accurate!</div>
    );
  }
  return (
    <div className="p-4 border border-white">
      {Object.keys(state.accuracy).map((module) => {
        const actual = state.accuracy[module].actual;
        const expected = state.accuracy[module].expected;
        return (
          <React.Fragment key={module}>
            <div className="p-2">
              <div>{module}</div>
              <p className="text-red-400">Actual: {actual}%</p>
              <p className="text-blue-400">Expected: {expected}%</p>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default CheckScoreAccuracy;
