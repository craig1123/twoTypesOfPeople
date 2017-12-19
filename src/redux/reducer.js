import initialState from './initialState';

export const types = {
  UPDATESTATE: 'UPDATESTATE',
  UPDATEMULTIPLE: 'UPDATEMULTIPLE',
};

const updateState = (state, change) => ({
  ...state,
  [change.key]: change.value,
});

const updateMultiple = (state, changes) => {
  let currentState = state;
  for (let i = 0; i < changes.length; i += 1) {
    currentState = updateState(currentState, changes[i]);
  }
  return currentState;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATESTATE:
      return updateState(state, action.change);
    case types.UPDATEMULTIPLE:
      return updateMultiple(state, action.changes);
    default:
      return state;
  }
};

export default reducer;
