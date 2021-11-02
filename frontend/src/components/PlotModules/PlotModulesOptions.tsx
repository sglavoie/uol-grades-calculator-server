import _ from 'lodash';
import React from 'react';
import { PlotModulesOptionsType } from 'types';

const PlotModulesOptions = ({
  currentOptions,
}: {
  currentOptions: PlotModulesOptionsType;
}): JSX.Element => {
  const [options, setOptions] = React.useState({});
  const [customTitle, setCustomTitle] = React.useState('');
  const [dpi, setDpi] = React.useState(currentOptions.dpi);
  const [checkedLongModuleNames, setCheckedLongModuleNames] = React.useState(
    currentOptions.long_module_names
  );
  const [checkedNoAvgOverall, setCheckedNoAvgOverall] = React.useState(
    currentOptions.no_avg_overall
  );
  const [checkedNoAvgUnweighted, setCheckedNoAvgUnweighted] = React.useState(
    currentOptions.no_avg_unweighted
  );
  const [checkedNoAvgWeighted, setCheckedNoAvgWeighted] = React.useState(
    currentOptions.no_avg_weighted
  );
  const [checkedNoAvgs, setCheckedNoAvgs] = React.useState(
    currentOptions.no_avgs
  );
  const [checkedNoGrades, setCheckedNoGrades] = React.useState(
    currentOptions.no_grades
  );
  const [checkedNoModuleNames, setCheckedNoModuleNames] = React.useState(
    currentOptions.no_module_names
  );
  const [checkedNoTrend, setCheckedNoTrend] = React.useState(
    currentOptions.no_trend
  );
  const [checkedTitleKeepDate, setCheckedTitleKeepDate] = React.useState(
    currentOptions.title_keep_date
  );
  const [checkedTitleNoDate, setCheckedTitleNoDate] = React.useState(
    currentOptions.title_no_date
  );

  const setPlotOptions = () => {
    const newOptions = {
      dpi: dpi,
      long_module_names: checkedLongModuleNames,
      no_avg_overall: checkedNoAvgOverall,
      no_avg_unweighted: checkedNoAvgUnweighted,
      no_avg_weighted: checkedNoAvgWeighted,
      no_avgs: checkedNoAvgs,
      no_grades: checkedNoGrades,
      no_module_names: checkedNoModuleNames,
      no_trend: checkedNoTrend,
      title_keep_date: checkedTitleKeepDate,
      title_no_date: checkedTitleNoDate,
      title: customTitle,
    };
    setOptions(newOptions);
    console.log(newOptions);
  };

  const handleDpi = (event) => {
    let { value } = event.target;
    const { min, max } = event.target;
    value = Math.max(Number(min), Math.min(Number(max), Number(value)));
    setDpi(value);
  };

  return (
    <section className="mt-12 text-left">
      <h1>Plot options</h1>
      <div>
        <h2>Title</h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="title">Custom title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={customTitle}
              onChange={(e) => {
                setCustomTitle(e.target.value);
              }}
            />
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
                checked={checkedTitleKeepDate}
                onChange={() => {
                  setCheckedTitleKeepDate(!checkedTitleKeepDate);
                }}
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
                checked={checkedTitleNoDate}
                onChange={() => {
                  setCheckedTitleNoDate(!checkedTitleNoDate);
                }}
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
              checked={checkedNoModuleNames}
              onChange={() => {
                setCheckedNoModuleNames(!checkedNoModuleNames);
              }}
            />
          </div>
          <div>
            <label htmlFor="modulesLongNames">Show long names</label>
            <input
              className="h-8"
              type="checkbox"
              name="modulesLongNames"
              id="modulesLongNames"
              checked={checkedLongModuleNames}
              onChange={() => {
                setCheckedLongModuleNames(!checkedLongModuleNames);
              }}
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
                checked={checkedNoAvgs}
                onChange={() => {
                  setCheckedNoAvgs(!checkedNoAvgs);
                }}
              />
            </div>
            <div>
              <label htmlFor="avgAcrossModules">Show across all modules</label>
              <input
                type="checkbox"
                className="h-8"
                name="avgAcrossModules"
                id="avgAcrossModules"
                checked={checkedNoAvgOverall}
                onChange={() => {
                  setCheckedNoAvgOverall(!checkedNoAvgOverall);
                }}
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
                checked={checkedNoAvgUnweighted}
                onChange={() => {
                  setCheckedNoAvgUnweighted(!checkedNoAvgUnweighted);
                }}
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
                checked={checkedNoAvgWeighted}
                onChange={() => {
                  setCheckedNoAvgWeighted(!checkedNoAvgWeighted);
                }}
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
              value={dpi}
              id="dpi"
              // accept only digits
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              onChange={(e) => setDpi(_.toNumber(e.target.value))}
              // make sure the input remains with a valid value when focus is lost
              onBlur={handleDpi}
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
                checked={checkedNoTrend}
                onChange={() => {
                  setCheckedNoTrend(!checkedNoTrend);
                }}
              />
            </div>
            <div>
              <label htmlFor="showGrades">Show grades</label>
              <input
                className="h-8"
                type="checkbox"
                name="showGrades"
                id="showGrades"
                checked={checkedNoGrades}
                onChange={() => {
                  setCheckedNoGrades(!checkedNoGrades);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 float-right w-3/5">
        <button className="btn btn-blue" onClick={setPlotOptions}>
          Generate new plot
        </button>
      </div>
    </section>
  );
};

export default PlotModulesOptions;
