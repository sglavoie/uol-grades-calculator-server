import React from 'react';

const PlotModulesOptions = (): JSX.Element => {
  return (
    <section className="mt-12 text-left">
      <h1>Plot options</h1>
      <div>
        <h2>Title</h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="title">Custom title</label>
            <input type="text" name="title" id="title" />
          </div>
          <div className="leading-loose">
            <div>
              <label htmlFor="dateCustomTitle">
                Remove date in custom title
              </label>
              <input
                className="h-8"
                type="checkbox"
                name="dateCustomTitle"
                id="dateCustomTitle"
              />
            </div>
            <div>
              <label htmlFor="dateDefaultTitle">
                Remove date in default title
              </label>
              <input
                className="h-8"
                type="checkbox"
                name="dateDefaultTitle"
                id="dateDefaultTitle"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2>Modules</h2>
        <div className="flex leading-loose">
          <div className="mr-4">
            <label htmlFor="modulesNames">Show names</label>
            <input
              type="checkbox"
              className="h-8"
              name="modulesNames"
              id="modulesNames"
            />
          </div>
          <div>
            <label htmlFor="modulesLongNames">Show long names</label>
            <input
              className="h-8"
              type="checkbox"
              name="modulesLongNames"
              id="modulesLongNames"
            />
          </div>
        </div>
      </div>
      <div>
        <h2>Averages</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="leading-loose">
            <div className="mr-4">
              <label htmlFor="hideAllAvgs">Hide all</label>
              <input
                type="checkbox"
                className="h-8"
                name="hideAllAvgs"
                id="hideAllAvgs"
              />
            </div>
            <div>
              <label htmlFor="avgAcrossModules">Show across all modules</label>
              <input
                type="checkbox"
                className="h-8"
                name="avgAcrossModules"
                id="avgAcrossModules"
              />
            </div>
          </div>
          <div className="leading-loose">
            <div className="mr-4">
              <label htmlFor="avgUnweightedSemester">
                Show unweighted per semester
              </label>
              <input
                type="checkbox"
                className="h-8"
                name="avgUnweightedSemester"
                id="avgUnweightedSemester"
              />
            </div>
            <div>
              <label htmlFor="avgWeightedSemester">
                Show weighted per semester
              </label>
              <input
                className="h-8"
                type="checkbox"
                name="avgWeightedSemester"
                id="avgWeightedSemester"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2>Additional settings</h2>
        <div className="grid grid-cols-6 gap-4 leading-loose">
          <div className="mr-4">
            <label htmlFor="dpi">DPI</label>
            <input
              type="number"
              className="h-8"
              name="dpi"
              min="100"
              max="600"
              value="300"
              id="dpi"
            />
          </div>
          <div>
            <div className="mr-4">
              <label htmlFor="trendLine">Show trend line</label>
              <input
                type="checkbox"
                className="h-8"
                name="trendLine"
                id="trendLine"
              />
            </div>
            <div>
              <label htmlFor="showGrades">Show grades</label>
              <input
                className="h-8"
                type="checkbox"
                name="showGrades"
                id="showGrades"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 float-right w-3/5">
        <button className="btn btn-blue">Generate new plot</button>
      </div>
    </section>
  );
};

export default PlotModulesOptions;
