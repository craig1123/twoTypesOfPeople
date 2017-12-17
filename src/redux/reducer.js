export const types = {
  UPDATESTATE: 'UPDATESTATE',
  UPDATEMULTIPLE: 'UPDATEMULTIPLE',
};

export const initialState = {
  country: '',
  gender: '',
  ageGroup: '',
  USState: '',
  items: [
    { option1: 33, option2: 20 },
    { option1: 16, option2: 16 },
    { option1: 9, option2: 15 },
    { option1: 9, option2: 13 },
    { option1: 8, option2: 12 },
    { option1: 6, option2: 11 },
    { option1: 7, option2: 9 },
    { option1: 6, option2: 7 },
    { option1: 5, option2: 7 },
    { option1: 1, option2: 8 },
    { option1: 1, option2: 7 },
    { option1: 2, option2: 6 },
    { option1: 1, option2: 6 },
    { option1: 3, option2: 2 },
    { option1: 2, option2: 3 },
    { option1: 3, option2: 3 },
    { option1: 2, option2: 3 },
    { option1: 2, option2: 3 },
    { option1: 2, option2: 3 },
    { option1: 1, option2: 3 },
    { option1: 1, option2: 3 },
    { option1: 1, option2: 3 },
    { option1: 2, option2: 0 },
    { option1: 1, option2: 1 },
    { option1: 1, option2: 1 },
    { option1: 1, option2: 1 },
    { option1: 1, option2: 1 },
    { option1: 1, option2: 1 },
    { option1: 3, option2: 0 },
    { option1: 2, option2: 1 },
    { option1: 2, option2: 0 },
    { option1: 2, option2: 0 },
    { option1: 2, option2: 0 },
    { option1: 0, option2: 1 },
    { option1: 0, option2: 1 },
    { option1: 0, option2: 1 },
    { option1: 0, option2: 1 },
    { option1: 0, option2: 1 },
    { option1: 0, option2: 1 },
    { option1: 0, option2: 1 },
  ],
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
