import React from 'react';
import './App.css';

// Routing
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Components
import Header from './components/Header';
import CheckScoreAccuracy from './components/CheckScoreAccuracy';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Header />

          <Switch>
            <Route path="/check-score-accuracy">
              <CheckScoreAccuracy />
            </Route>
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
