import React from 'react';
import PropTypes from 'prop-types';
import Cell from '../Cell/Cell';


import './Row.scss';

const Row = ({ row, width }) => {
  let cells = [];
  // Game Grid.
  if (typeof row !== 'number') {
    cells = row.map((e, i) => <Cell key={i} fill={e.fill} color={e.color} />);
  // Player Spectrum.
  } else {
    const height = (width / 2) * 3;
    for (let i = 0; i < height; i++) {
      cells.push(<Cell key={i} fill={row <= i} color="grey" />);
    }
  }
  return <div className="row">{cells}</div>;
};

Row.propTypes = {
  row: PropTypes.oneOfType([PropTypes.array, PropTypes.number]).isRequired,
  width: PropTypes.number,
};

Row.defaultProps = {
  width: 0,
};

export default Row;
