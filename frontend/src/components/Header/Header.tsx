import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useAppSelector } from '../../hooks';
import { selectGradesLoaded } from '../../features/grades/gradesSlice';

const AppHome = (): JSX.Element => (
  <div style={{ marginBottom: '5em' }}>
    <div style={{ marginBottom: '2em', paddingTop: '1em' }}>
      <Link to="/">Home</Link>
    </div>
  </div>
);

const AppActions = (): JSX.Element => (
  <div>
    <Link to="/check-score-accuracy">Check score accuracy</Link> -{' '}
    <Link to="/summarize-done">Summarize done</Link> -{' '}
    <Link to="/summarize-progress">Summarize progress</Link> -{' '}
    <Link to="/summarize-all">Summarize all</Link>
  </div>
);

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
