import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { resetGrades, selectGradesData } from '../../features/grades/gradesSlice';
import { downloadGrades, downloadTemplate } from '../helpers';

const HeaderFull = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const grades = useAppSelector(selectGradesData);

  const resetAllGrades = async () => {
    localStorage.removeItem('grades');
    dispatch(resetGrades());
  };

  return (
    <div>
      <Link to="/">Home</Link> -{' '}
      <Link to="/check-score-accuracy">Check score accuracy</Link> -{' '}
      <Link to="/summarize-done">Summarize done</Link> -{' '}
      <Link to="/summarize-progress">Summarize progress</Link> -{' '}
      <Link to="/summarize-all">Summarize all</Link> -{' '}
      <Link to="/plot-modules">Plot modules</Link> -{' '}
      <a href="#" onClick={downloadTemplate}>
        Download empty template
      </a>{' '}
      -{' '}
      <a href="#" onClick={() => downloadGrades(grades)}>
        Download grades
      </a>{' '}
      -{' '}
      <a href="#" onClick={resetAllGrades}>
        Reset all grades
      </a>
    </div>
  );
};

export default HeaderFull;
