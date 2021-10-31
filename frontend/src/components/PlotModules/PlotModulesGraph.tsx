import React from 'react';

interface ImagePath {
  path: string;
}

const PlotModulesGraph = (props: ImagePath): JSX.Element => {
  return (
    <div className="mt-12 text-center">
      <img src={props.path} className="max-w-screen-xl inline-block" />
    </div>
  );
};

export default PlotModulesGraph;
