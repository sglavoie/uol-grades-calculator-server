import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = (): JSX.Element => (
  <div className="inline-block align-middle">
    <h1 className="m-16 text-6xl">404 - Page Not Found!</h1>
    <Link to="/" className="font-semibold">
      Go Home
    </Link>
  </div>
);

export default NotFound;
