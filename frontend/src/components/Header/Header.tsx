import React from 'react';

import { Link } from 'react-router-dom';

const Header = (): JSX.Element => {
  return (
    <div style={{ marginBottom: '5em' }}>
      <Link to="/">Home</Link> -{' '}
      <Link to="/check-score-accuracy">Check score accuracy</Link> -{' '}
      <Link to="/summarize-done">Summarize done</Link> -{' '}
      <Link to="/summarize-progress">Summarize progress</Link>
    </div>
  );
};

export default Header;
