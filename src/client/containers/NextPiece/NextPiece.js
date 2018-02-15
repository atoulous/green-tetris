import React from 'react';
import { connect } from 'react-redux';

import './NextPiece.scss';
import Grid from '../../components/grid/Grid';
import { initGrid, forEachBlockInPiece } from '../../helpers';

const NextPiece = ({ piecesQueue }) => {
  const nextPiece = pieceQueue[0];
  const grid = initGrid(4, 4);

  forEachBlockInPiece(nextPiece, (x, y) => {
    const cell = grid[x][y];
    cell.fill = true;
    cell.color = nextPiece.t.color;
  });

  return (
    <div className="nextPiece">
      <span>Next Piece</span>
      <Grid grid={grid} />
    </div>
  );
};


const mapStateToProps = state => ({
  pieceQueue: state.pieceQueue,
});


export default connect(mapStateToProps)(NextPiece);
