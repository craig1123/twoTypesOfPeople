export default (bgColor) => {
  const nThreshold = 105;
  const components = getRGBComponents(bgColor);
  const bgDelta = (components.R * 0.299) + (components.G * 0.587) + (components.B * 0.114);
  return ((255 - bgDelta) < nThreshold) ? '#585858' : '#ededed';
};

const getRGBComponents = color => ({
  R: parseInt(color.substring(1, 3), 16),
  G: parseInt(color.substring(3, 5), 16),
  B: parseInt(color.substring(5, 7), 16),
});
