import { createStore, compose } from 'redux';
import rootReducer from './reducer';

export default function configureStore(initialState) {
  const composeEnhancers = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ // eslint-disable-line
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ // eslint-disable-line
    : compose;
  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(),
  );
}
