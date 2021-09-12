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

const App = (): JSX.Element => {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route
              path="/check-score-accuracy"
              component={CheckScoreAccuracy}
            />
            <Route exact path="/summarize-done" component={SummarizeDone} />
            <Route
              exact
              path="/summarize-progress"
              component={SummarizeProgress}
            />
            <Route exact path="/summarize-all" component={SummarizeAll} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </header>
    </div>
  );
};

export default App;
