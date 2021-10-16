import React from 'react';
import { Link } from 'react-router-dom';

const HeaderLimited = (): JSX.Element => {
  return (
    <div>
      <div>
        <Link to="/">Home</Link>
      </div>
    </div>
  );
};

export default HeaderLimited;
