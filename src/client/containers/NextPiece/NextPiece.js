import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './NextPiece.scss';
import Grid from '../../components/Grid/Grid';
import { initGrid, forEachBlockInPiece } from '../../utils/tetris';


const NextPiece = ({ piecesQueue }) => {
  const grid = initGrid(4, 4);

  if (piecesQueue.length > 0) {
    const nextPiece = {
      t: piecesQueue[0],
      dir: 0,
      x: 0,
      y: 0,
    };
    forEachBlockInPiece(nextPiece, (x, y) => {
      const cell = grid[x][y];
      cell.fill = true;
      cell.color = nextPiece.t.color;
    });
  }

  return (
    <div className="nextPiece">
      <span>Next Piece</span>
      <Grid grid={grid} />
    </div>
  );
};

NextPiece.propTypes = {
  piecesQueue: PropTypes.array,
};

NextPiece.defaultProps = {
  piecesQueue: [],
};

const mapStateToProps = state => ({
  piecesQueue: state.piecesQueue,
});

export default connect(mapStateToProps)(NextPiece);
