import React from 'react';
import { connect } from 'react-redux';

import './NextPiece.scss';
import Grid from '../../components/Grid/Grid';
import { initGrid, forEachBlockInPiece } from '../../helpers';

const NextPiece = ({ piecesQueue }) => {
  const grid = initGrid(4, 4);

  if (piecesQueue.length > 0) {
    const nextPiece = piecesQueue[0];
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


const mapStateToProps = state => ({
  piecesQueue: state.piecesQueue,
});


export default connect(mapStateToProps)(NextPiece);
