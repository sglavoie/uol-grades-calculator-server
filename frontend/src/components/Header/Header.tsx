import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useAppSelector } from '../../hooks';
import { selectGradesLoaded } from '../../features/grades/gradesSlice';
import axios from 'axios';
import CONFIG from '../../config';
import FileSaver from 'file-saver';

const AppHome = (): JSX.Element => (
  <div style={{ marginBottom: '5em' }}>
    <div style={{ marginBottom: '2em', paddingTop: '1em' }}>
      <Link to="/">Home</Link>
    </div>
  </div>
);

const AppActions = (): JSX.Element => {
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

  return (
    <div>
      <Link to="/check-score-accuracy">Check score accuracy</Link> -{' '}
      <Link to="/summarize-done">Summarize done</Link> -{' '}
      <Link to="/summarize-progress">Summarize progress</Link> -{' '}
      <Link to="/summarize-all">Summarize all</Link> -{' '}
      <a href="#" onClick={() => getTemplate()}>
        Get template
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
  const loaded = useAppSelector(selectGradesLoaded);

  if (loaded) return <AppGradesLoaded />;
  return <AppHome />;
};

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStateToProps)(Header);
