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
import NotFound from './components/NotFound';
import SummarizeAll from './components/SummarizeAll';
import SummarizeDone from './components/SummarizeDone';
import SummarizeProgress from './components/SummarizeProgress';
import HomePage from './components/HomePage';
import HeaderFull from './components/HeaderFull';
import HeaderLimited from './components/HeaderLimited';

// Styles
import './App.css';
import Uploader from './components/Uploader';
import PlotModules from './components/PlotModules';

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
    <div className="App">
      <header className="App-header">
        <Router>
          <HeaderComponent gradesLoaded={gradesLoaded} />
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
        </Router>
      </header>
    </div>
  );
};

export default App;
