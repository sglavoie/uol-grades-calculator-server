import React from 'react';

// Routing
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Components
import CheckScoreAccuracy from './components/CheckScoreAccuracy';
import Header from './components/Header';
import NotFound from './components/NotFound';
import SummarizeAll from './components/SummarizeAll';
import SummarizeDone from './components/SummarizeDone';
import SummarizeProgress from './components/SummarizeProgress';
import HomePage from './components/HomePage';

// Styles
import './App.css';
import { useAppSelector } from './hooks';
import { selectGradesLoaded } from './features/grades/gradesSlice';

const App = (): JSX.Element => {
  const gradesLoaded = useAppSelector(selectGradesLoaded);

  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/check-score-accuracy">
              {gradesLoaded ? <CheckScoreAccuracy /> : <HomePage />}
            </Route>
            <Route exact path="/summarize-done">
              {gradesLoaded ? <SummarizeDone /> : <HomePage />}
            </Route>
            <Route exact path="/summarize-progress">
              {gradesLoaded ? <SummarizeProgress /> : <HomePage />}
            </Route>
            <Route exact path="/summarize-all">
              {gradesLoaded ? <SummarizeAll /> : <HomePage />}
            </Route>
            <Route component={NotFound} />
          </Switch>
        </Router>
      </header>
    </div>
  );
};

export default App;
