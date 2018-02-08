import React from "react";
import Row from "./row.js";
import Alert from "./alert.js";
import { keys } from "../constants.js";

const Grid = ({
  grid,
  currentPiece,
  isPlaying,
  movePieceLeft,
  movePieceRight,
  rotatePiece
}) => {
  const gridStyle = {
    position: "relative",
    textAlign: "center"
  };

  const move = e => {
    switch (e.keyCode) {
      case keys.LEFT:
        movePieceLeft();
        break;
      case keys.RIGHT:
        movePieceRight();
        break;
      case keys.UP:
        rotatePiece();
        break;
      case keys.DOWN:
        rotatePiece();
        break;
    }
  };

  return (
    <div style={gridStyle} onKeyDown={move} tabIndex="0">
      {grid.map((e, i) => {
        return <Row key={i} row={e} />;
      })}
    </div>
  );
};

export default Grid;
