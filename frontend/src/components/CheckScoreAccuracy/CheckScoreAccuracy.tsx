import React from 'react';
import useFetch from '../../hooks/useFetch';
import { checkScoreAccuracyResponse } from '../../types';

const CheckScoreAccuracy = (): JSX.Element => {
  const { state, error, errorMsg, loading } =
    useFetch<checkScoreAccuracyResponse>('/check/score-accuracy');

  if (error) return <div>Error: {errorMsg}</div>;
  if (loading) return <div></div>;

  if (state.ok) {
    return <div>All module scores are accurate!</div>;
  }
  return (
    <div style={{ border: '1px solid white', padding: '1em' }}>
      {Object.keys(state.accuracy).map((module) => {
        const actual = state.accuracy[module].actual;
        const expected = state.accuracy[module].expected;
        return (
          <React.Fragment key={module}>
            <div style={{ padding: '1.5em' }}>
              <div>{module}</div>
              <p style={{ color: '#ff5353' }}>Actual: {actual}%</p>
              <p style={{ color: '#53caff' }}>Expected: {expected}%</p>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default React.memo(CheckScoreAccuracy);
