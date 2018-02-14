import React from 'react';
import Row from './row';

const Grid = (props) => {
  let {
    grid, move, additionalClasses, rowAdditionalClasses
  } = props;
  if (!rowAdditionalClasses) rowAdditionalClasses = [];
  if (!additionalClasses) additionalClasses = [];
  const classNames = `grid ${additionalClasses.join(' ')}`;

  return (
    <div className="grid">
      <div className={classNames} onKeyDown={move} tabIndex="0">
        {grid.map((e, i) => <Row key={i} row={e} additionalClasses={rowAdditionalClasses} />)}
      </div>
    </div>
  );
};

export default Grid;
