import { types } from './reducer';

export const updateState = change => ({
  type: types.UPDATESTATE,
  change,
});

export const updateMultiple = changes => ({
  type: types.UPDATEMULTIPLE,
  changes,
});
