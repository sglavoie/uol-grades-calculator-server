import React from 'react';
import _ from 'lodash';

// Routing
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

// State management
import { useAppDispatch, useAppSelector } from './hooks';
import {
  selectGradesLoaded,
  setGrades,
  setGradesLoaded,
} from './features/grades/gradesSlice';

// Components
import CheckScoreAccuracy from './components/CheckScoreAccuracy';
import HeaderFull from './components/HeaderFull';
import HeaderLimited from './components/HeaderLimited';
import HomePage from './components/HomePage';
import NotFound from './components/NotFound';
import PlotModules from './components/PlotModules';
import SummarizeAll from './components/SummarizeAll';
import SummarizeDone from './components/SummarizeDone';
import SummarizeProgress from './components/SummarizeProgress';
import Uploader from './components/Uploader';

const HeaderComponent = ({ gradesLoaded }): JSX.Element => {
  if (gradesLoaded) return <HeaderFull />;
  return <HeaderLimited />;
};

const App = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const grades = localStorage.getItem('grades') || '';
  const gradesLoaded = useAppSelector(selectGradesLoaded);
  const gradesAreEmpty = _.isEmpty(grades);

  if (!gradesAreEmpty) {
    dispatch(setGrades(JSON.parse(grades)));
    dispatch(setGradesLoaded(true));
  }

  return (
    <div className="text-center text-base">
      <header className="items-center justify-center text-white flex-auto flex-col min-h-screen bg-gray-800">
        <Router>
          <div className="p-4 font-medium bg-black">
            <HeaderComponent gradesLoaded={gradesLoaded} />
          </div>
          <div className="m-16">
            <Switch>
              <Route exact path="/">
                {gradesLoaded ? <HomePage /> : <Uploader />}
              </Route>
              <Route exact path="/check-score-accuracy">
                {gradesLoaded ? <CheckScoreAccuracy /> : <Redirect to="/" />}
              </Route>
              <Route exact path="/summarize-done">
                {gradesLoaded ? <SummarizeDone /> : <Redirect to="/" />}
              </Route>
              <Route exact path="/summarize-progress">
                {gradesLoaded ? <SummarizeProgress /> : <Redirect to="/" />}
              </Route>
              <Route exact path="/summarize-all">
                {gradesLoaded ? <SummarizeAll /> : <Redirect to="/" />}
              </Route>
              <Route exact path="/plot-modules">
                {gradesLoaded ? <PlotModules /> : <Redirect to="/" />}
              </Route>
              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>
      </header>
    </div>
  );
};

export default App;
