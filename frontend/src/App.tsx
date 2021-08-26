import React from 'react';
import './App.css';

// Routing
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Components
import Header from './components/Header';
import CheckScoreAccuracy from './components/CheckScoreAccuracy';
import SummarizeDone from './components/SummarizeDone';

const App = (): JSX.Element => {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Header />

          <Switch>
            <Route path="/check-score-accuracy">
              <CheckScoreAccuracy />
            </Route>
            <Route path="/summarize-done">
              <SummarizeDone />
            </Route>
          </Switch>
        </Router>
      </header>
    </div>
  );
};

export default App;
