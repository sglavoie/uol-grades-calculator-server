import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const HeaderLimited = (): JSX.Element => {
  return (
    <div style={{ marginBottom: '5em' }}>
      <div style={{ marginBottom: '2em', paddingTop: '1em' }}>
        <Link to="/">Home</Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStateToProps)(HeaderLimited);
