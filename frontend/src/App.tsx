import React from 'react';
import './App.css';

// Routing
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Components
import Header from './components/Header';
import CheckScoreAccuracy from './components/CheckScoreAccuracy';
import Header from './components/Header';
import NotFound from './components/NotFound';
import SummarizeDone from './components/SummarizeDone';
import SummarizeProgress from './components/SummarizeProgress';

const App = (): JSX.Element => {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Header />

          <Switch>
            <Route exact path="/" />
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
            <Route component={NotFound} />
          </Switch>
        </Router>
      </header>
    </div>
  );
};

export default App;
