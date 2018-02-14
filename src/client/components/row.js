import React from 'react';
import Cell from './cell';
import { heightSize } from '../constants';

const Row = ({ row }) => {

  let cells = [];
  // Game grid.
  if (typeof row != 'number') {
    cells = row.map((e, i) => <Cell key={i} fill={e.fill} color={e.color} />); 
  // Player spectrum.
  } else {
    for(let i = 0; i < heightSize; i++) {
      cells.push(<Cell key={i} fill={row <= i} color='grey' />)
    }
  }
  return <div className='row'>{cells}</div>;
};

export default Row;
