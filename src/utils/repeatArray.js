export default (arr, count) => {
  const ln = arr.length;
  const b = [];
  for (let i = 0; i < count; i += 1) {
    b.push(arr[i % ln]);
  }
  return b;
};
