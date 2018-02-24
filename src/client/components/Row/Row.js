import React from 'react';
import Cell from '../Cell/Cell';
import { heightSize } from '../../helpers/constants';

import './Row.scss';

const Row = ({ row }) => {
  let cells = [];
  // Game Grid.
  if (typeof row !== 'number') {
    cells = row.map((e, i) => <Cell key={i} fill={e.fill} color={e.color} />);
  // Player Spectrum.
  } else {
    for (let i = 0; i < heightSize; i++) {
      cells.push(<Cell key={i} fill={row <= i} color="grey" />);
    }
  }
  return <div className="row">{cells}</div>;
};

export default Row;
