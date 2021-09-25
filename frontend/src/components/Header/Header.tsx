import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  resetGrades,
  selectGradesLoaded,
} from '../../features/grades/gradesSlice';
import axios from 'axios';
import FileSaver from 'file-saver';
import CONFIG from '../../config';

const AppHome = (): JSX.Element => (
  <div style={{ marginBottom: '5em' }}>
    <div style={{ marginBottom: '2em', paddingTop: '1em' }}>
      <Link to="/">Home</Link>
    </div>
  </div>
);

const AppActions = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const getTemplate = async () => {
    try {
      const response = await axios.get(`${CONFIG.SERVER_URL}/get-template`);
      let data = await response.data;

      // Prettify JSON output with indentation of 2 spaces
      data = JSON.stringify(data, null, 2);

      // Save with JSON mime type and correct config file name
      const blob = new Blob([data], { type: 'application/json' });
      FileSaver.saveAs(blob, CONFIG.GRADES_CONFIG_FILE);
    } catch (err) {
      console.log('Error fetching template...', err.message);
    }
  };

  const resetAllGrades = async () => {
    localStorage.removeItem('grades');
    dispatch(resetGrades());
  };

  return (
    <div>
      <Link to="/check-score-accuracy">Check score accuracy</Link> -{' '}
      <Link to="/summarize-done">Summarize done</Link> -{' '}
      <Link to="/summarize-progress">Summarize progress</Link> -{' '}
      <Link to="/summarize-all">Summarize all</Link> -{' '}
      <a href="#" onClick={() => getTemplate()}>
        Get template
      </a>{' '}
      -{' '}
      <a href="#" onClick={() => resetAllGrades()}>
        Reset all grades
      </a>
    </div>
  );
};

const AppGradesLoaded = (): JSX.Element => (
  <>
    <AppHome />
    <AppActions />
  </>
);

const Header = (): JSX.Element => {
  const gradesLoaded = useAppSelector(selectGradesLoaded);

  if (gradesLoaded) return <AppGradesLoaded />;
  return <AppHome />;
};

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStateToProps)(Header);
