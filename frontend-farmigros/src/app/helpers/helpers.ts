export const getItemSizeByZoomLevel = (zoomLevel) => {
  const sizes = {
    1: 64,
    2: 72,
    3: 80,
    4: 88,
    5: 96,
    6: 104,
    7: 112,
    8: 120,
    9: 128,
    10: 136,
  };

  return sizes[zoomLevel];
}
