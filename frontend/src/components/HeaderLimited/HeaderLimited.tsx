import React from 'react';
import { Link } from 'react-router-dom';

const HeaderLimited = (): JSX.Element => {
  return (
    <div style={{ marginBottom: '5em' }}>
      <div style={{ marginBottom: '2em', paddingTop: '1em' }}>
        <Link to="/">Home</Link>
      </div>
    </div>
  );
};

export default HeaderLimited;
