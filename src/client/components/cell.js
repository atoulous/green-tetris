import React from 'react';

const Cell = (cell) => {
  const { fill, color } = cell;
  const cellStyle = {
    border: 'solid gray 1px',
    width: '20px',
    height: '20px',
    display: 'flex',
    borderRadius: '0',
    margin: '0'
  };

  if (fill) {
    cellStyle.backgroundColor = color;
  }

  return <div style={cellStyle} />;
};

export default Cell;
