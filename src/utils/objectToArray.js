export default (items) => {
  const newState = [];
  for (const item in items) { // eslint-disable-line
    newState.push(items[item]);
  }
  return newState;
};
