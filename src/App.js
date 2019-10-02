import React, { useState, useEffect } from 'react';

/// Router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Helpers

// Styles
import './App.scss';
import './components/styles/AnimationStyles.scss';

// Animations
import { CSSTransition, TransitionGroup } from 'react-transition-group';

// Components
import MockingMiddleware from './components/MockingMiddleware';
import DataCapture from './components/data-capture/DataCapture';
import Thanks from './components/common/Thanks';
import FlexCenter from './components/common/FlexCenter';
const Loader = require('react-loaders').Loader;

function App() {
  // Component State to Mock Loading Screen
  let [loading, setLoading] = useState(true);
  let [awaiting, setAwait] = useState(true);

  // On app mount mock loading screen
  useEffect(() => {
    setTimeout(() => setLoading(false), 750);
    setTimeout(() => setAwait(false), 1000);
  }, []);

  // App View
  return !loading && !awaiting ? (
    <Router>
      <Route
        render={({ location }) => {
          const { key } = location;
          return (
            <div className="App">
              <div className="event-info">Event X on Y avenue at Z time</div>
              <TransitionGroup>
                <CSSTransition
                  key={key}
                  timeout={{ enter: 300, exit: 300 }}
                  classNames={'fade'}
                >
                  <Switch>
                    <Route
                      exact
                      path="/"
                      component={props => <MockingMiddleware {...props} />}
                    />
                    <Route
                      exact
                      path="/details/:name/:email"
                      component={props => <DataCapture {...props} />}
                    />
                    <Route
                      exact
                      path="/thanks/:optin"
                      component={props => <Thanks {...props} />}
                    />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            </div>
          );
        }}
      />
    </Router>
  ) : (
    <CSSTransition
      in={loading}
      timeout={250}
      classNames="salmon"
      unmountOnExit
      onEnter={() => setLoading(true)}
      onExited={() => setLoading(false)}
    >
      <FlexCenter classNames="flex-center flex-center-spinner salmon">
        <Loader type="line-scale" active />
      </FlexCenter>
    </CSSTransition>
  );
}

export default App;
