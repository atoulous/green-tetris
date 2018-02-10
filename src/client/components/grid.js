import React from 'react';
import Row from './row';

const Grid = ({
  grid,
  move,
}) => {
  const gridStyle = {
    position: 'relative',
    textAlign: 'center'
  };

  return (
    <div style={gridStyle} onKeyDown={move} tabIndex="0">
      {grid.map((e, i) => <Row key={i} row={e} />)}
    </div>
  );
};

export default Grid;
