import React from 'react';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';
import AsyncComponent from './AsyncComponent';

const AsyncQuestions = AsyncComponent(() => import('./quiz/Questions'));
const AsyncLanding = AsyncComponent(() => import('./landing/Landing'));
const AsyncResults = AsyncComponent(() => import('./results/Results'));
const AsyncFourOFour = AsyncComponent(() => import('./FourOFour'));

const Router = () => (
  <Switch>
    <Route exact path="/quiz/:optionIndex" component={AsyncQuestions} />
    <Route exact path="/results" component={AsyncResults} />
    <Route exact path="/" component={AsyncLanding} />
    <Route component={AsyncFourOFour} />
  </Switch>
);

export default Router;
