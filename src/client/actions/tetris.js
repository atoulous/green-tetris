import { isPiecePlacable } from '../helpers';


// Constants
export const DRAW_PIECE = 'DRAW_PIECE';
export const ERASE_PIECE = 'ERASE_PIECE';
export const SET_PIECE = 'SET_PIECE';
export const TOGGLE_PLAY = 'TOGGLE_PLAY';
export const SET_NEW_PIECE = 'SET_NEW_PIECE';
export const REFRESH_GRID_WITHOUT_CURRENT = 'REFRESH_GRID_WITHOUT_CURRENT';
export const INCREASE_SPEED = 'INCREASE_SPEED';

// Action objects
export function refreshGridWithoutCurrent() {
  return { type: REFRESH_GRID_WITHOUT_CURRENT };
}

export function increaseSpeed() {
  return { type: INCREASE_SPEED };
}

export function drawPiece() {
  return { type: DRAW_PIECE };
}

export function erasePiece() {
  return { type: ERASE_PIECE };
}

export function setPiece(piece) {
  return { type: SET_PIECE, piece };
}

// Action thunk functions

/*
** Will drop piece from one x.
** Draw new grid if needed or set a new piece if current piece can't be placed.
** We'll compare to grid without current piece to avoid overlay.
*/
export function dropPiece() {
  return (dispatch, getState) => {
    const state = getState();

    // State is resume. Stop dropping.
    if (!state.isPlaying) return;

    const { currentPiece, gridWithoutCurrent } = state.tetris;
    const nextPiece = { ...currentPiece, ...{ x: currentPiece.x + 1 } };
    const interval = state.tetris.speed;

    // Enough space to place piece.
    if (isPiecePlacable(nextPiece, gridWithoutCurrent)) {
      dispatch(erasePiece());
      dispatch(setPiece(nextPiece));
      dispatch(drawPiece());
      setTimeout(() => {
        dispatch(dropPiece());
      }, interval);
    } else {
      // We draw last piece.
      dispatch(drawPiece());
      // We set a new piece.
      dispatch(setNewPiece());
    }
  };
}


/*
** Will set a new piece. Replace current piece. Check if game is lost or start dropping new piece.
*/
export function setNewPiece() {
  return (dispatch, getState) => {
    // Set new current piece randomly.
    dispatch({ type: SET_NEW_PIECE });
    // Save grid state without current piece for later comparison.
    dispatch({ type: REFRESH_GRID_WITHOUT_CURRENT });
    const state = getState();
    const { currentPiece, gridWithoutCurrent } = state.tetris;
    const interval = state.tetris.speed;
    // Not enough space to place piece. Game is lost.
    if (!isPiecePlacable(currentPiece, gridWithoutCurrent)) {
      console.log('PERDU');
    } else {
      dispatch(drawPiece());
      setTimeout(() => {
        dispatch(dropPiece());
      }, interval);
    }
  };
}

/*
** Action when on/off button is pressed.
*/
export function togglePlay() {
  return (dispatch, getState) => {
    dispatch({ type: TOGGLE_PLAY });
    const state = getState();
    // Start the game for the first time.
    if (state.tetris.currentPiece === null) {
      dispatch(setNewPiece());
    } else {
      dispatch(dropPiece());
    }
  };
}

/* wtf

function tetris(dispatch, getState) {
  const state = getState();
  const { currentPiece } = state.tetris;

  // If no currentPiece set. We set and draw one.
  if (!currentPiece) {
    dispatch(setNewPiece());
  }
}

*/

/**
 * Will move piece position to left. Re-draw.
 */
export function movePieceLeft() {
  return (dispatch, getState) => {
    console.log('logPieceLeft');
    const state = getState();
    const { currentPiece, gridWithoutCurrent } = state.tetris;
    const nextPiece = { ...currentPiece, ...{ y: currentPiece.y - 1 } };

    // Enough space to place piece.
    if (isPiecePlacable(nextPiece, gridWithoutCurrent)) {
      dispatch(erasePiece());
      dispatch(setPiece(nextPiece));
      dispatch(drawPiece());
    }
  };
}

/*
** Will move piece position to right. Re-draw.
*/
export function movePieceRight() {
  return (dispatch, getState) => {
    console.log('logPieceRight');
    const state = getState();
    const { currentPiece, gridWithoutCurrent } = state.tetris;
    const nextPiece = { ...currentPiece, ...{ y: currentPiece.y + 1 } };

    // Enough space to place piece.
    if (isPiecePlacable(nextPiece, gridWithoutCurrent)) {
      dispatch(erasePiece());
      dispatch(setPiece(nextPiece));
      dispatch(drawPiece());
    }
  };
}

/*
** Will rotate piece. Re-draw.
*/
export function rotatePiece() {
  return (dispatch, getState) => {
    const state = getState();
    const { currentPiece, gridWithoutCurrent } = state.tetris;
    const nextPiece = {
      ...currentPiece,
      ...{ dir: currentPiece.dir === 3 ? 0 : currentPiece.dir + 1 }
    };

    // Enough space to place piece.
    if (isPiecePlacable(nextPiece, gridWithoutCurrent)) {
      dispatch(erasePiece());
      dispatch(setPiece(nextPiece));
      dispatch(drawPiece());
    }
  };
}

export function moveDown() {
  return (dispatch, getState) => {
    const state = getState();
    const { currentPiece, gridWithoutCurrent } = state.tetris;
    const nextPiece = {
      ...currentPiece,
      ...{ x: currentPiece.x + 1 }
    };

    // Enough space to place piece.
    if (isPiecePlacable(nextPiece, gridWithoutCurrent)) {
      dispatch(erasePiece());
      dispatch(setPiece(nextPiece));
      dispatch(drawPiece());
    }
  };
}
