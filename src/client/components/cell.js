import React from 'react';

const Cell = (cell) => {
  const { fill, color } = cell;
  const cellStyle = {};
  if (fill) cellStyle.backgroundColor = color;
  return <div className='cell' style={cellStyle} />;
};

export default Cell;
