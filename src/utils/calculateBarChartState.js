export default ({
  bars, labelWidth, showLabels, width,
}) => {
  const x = showLabels ? width - labelWidth : width;
  const scale = (x / 100) / (Math.max(...bars.map(b => b.value)) / 100);
  const relativeBars = bars.map(b => ({ ...b, value: b.value * scale }));
  return { bars: relativeBars, scale, x };
};
