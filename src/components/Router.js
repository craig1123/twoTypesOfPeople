import React from 'react';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';
import Loadable from 'react-loadable';

const MyLoadingComponent = (props) => {
  if (props.error) {
    return <AsyncFourOFour />;
  } else if (props.timedOut) {
    return <AsyncFourOFour message="Slow Connection detected. Try refreshing your page" />;
  } else if (props.pastDelay) {
    return <div />;
  }
  return null;
};

const AsyncQuestions = Loadable({
  loader: () => import('./quiz/Questions'),
  loading: MyLoadingComponent,
  timeout: 12000, // 12 seconds
  delay: 50,
});
const AsyncLanding = Loadable({
  loader: () => import('./landing/Landing'),
  loading: MyLoadingComponent,
  timeout: 12000, // 12 seconds
  delay: 50,
});
const AsyncResults = Loadable({
  loader: () => import('./results/Results'),
  loading: MyLoadingComponent,
  timeout: 12000, // 12 seconds
  delay: 50,
});
const AsyncFourOFour = Loadable({
  loader: () => import('./FourOFour'),
  loading: MyLoadingComponent,
  timeout: 12000, // 12 seconds
  delay: 50,
});

const Router = () => (
  <Switch>
    <Route exact path="/quiz/:optionIndex" component={AsyncQuestions} />
    <Route exact path="/results" component={AsyncResults} />
    <Route exact path="/" component={AsyncLanding} />
    <Route component={AsyncFourOFour} />
  </Switch>
);

export default Router;
