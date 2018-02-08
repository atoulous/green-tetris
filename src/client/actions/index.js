//actions
import { RTCConnection, RTCConnectionMessage } from './connexion';
import { 
	refreshGridWithoutCurrent, 
	increaseSpeed, 
	drawPiece, 
	erasePiece, 
	setPiece, 
	setNewPiece, 
	togglePlay, 
	dropPiece, 
	tetris, 
	movePieceLeft,
	movePieceRight,
	moveDown,
	rotatePiece,
} from './tetris';


//names
import { RTC_CONN, RTC_MESSAGE} from './connexion';
import { DRAW_PIECE, ERASE_PIECE, SET_PIECE, TOGGLE_PLAY, SET_NEW_PIECE, REFRESH_GRID_WITHOUT_CURRENT, INCREASE_SPEED } from './tetris';

export const actions = {
	RTCConnection,
	RTCConnectionMessage,
	refreshGridWithoutCurrent,
	increaseSpeed, 
	drawPiece, 
	erasePiece, 
	setPiece, 
	setNewPiece, 
	togglePlay, 
	dropPiece, 
	tetris, 
	movePieceLeft,
	movePieceRight,
	moveDown,
	rotatePiece,
};

export const names = {
	RTC_CONN,
	RTC_MESSAGE,
	DRAW_PIECE,
	ERASE_PIECE,
	SET_PIECE,
	TOGGLE_PLAY,
	SET_NEW_PIECE,
	REFRESH_GRID_WITHOUT_CURRENT,
	INCREASE_SPEED,
}