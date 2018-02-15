import React from 'react';
import Row from '../row/Row';

import './Grid.scss';

const Grid = ({ grid, move, additionalClasses, rowAdditionalClasses }) => {
  if (!rowAdditionalClasses) rowAdditionalClasses = [];
  if (!additionalClasses) additionalClasses = [];
  const classNames = `grid ${additionalClasses.join(' ')}`;

  return (
    <div className={classNames} onKeyDown={move} tabIndex="0">
      {grid.map((e, i) => <Row key={i} row={e} additionalClasses={rowAdditionalClasses} />)}
    </div>
  );
};

export default Grid;