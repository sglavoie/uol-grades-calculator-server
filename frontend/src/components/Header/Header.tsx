import React from 'react';

import { Link } from 'react-router-dom';

const Header = (): JSX.Element => {
  return (
    <div style={{ marginBottom: '5em' }}>
      <div style={{ marginBottom: '2em', paddingTop: '1em' }}>
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/check-score-accuracy">Check score accuracy</Link> -{' '}
        <Link to="/summarize-done">Summarize done</Link> -{' '}
        <Link to="/summarize-progress">Summarize progress</Link> -{' '}
        <Link to="/summarize-all">Summarize all</Link>
      </div>
    </div>
  );
};

export default Header;
