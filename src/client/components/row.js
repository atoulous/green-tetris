import React from 'react';
import Cell from './cell';

const Row = ({ row }) => {
  const rowStyle = {
    display: 'flex',
    justifyContent: 'center',
  };
  return (
    <div style={rowStyle}>
      {' '}
      {
        //eslint-disable next-line
        row.map((e, i) => <Cell key={i} fill={e.fill} color={e.color} />)
      }
    </div>
  );
};

export default Row;
