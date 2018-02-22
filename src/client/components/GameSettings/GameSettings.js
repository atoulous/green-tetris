import React from 'react';
import PropTypes from 'prop-types';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';
import * as socket from '../../socket';


import './GameSettings.scss';

import actions from '../../actions';

const { socketUpdateGame, updateGame, socketUpdatePlayer } = actions;


const GameSettings = ({ game, dispatch, player }) => {
  const toggleStyle = {
    marginBottom: 15,
  };

  const { isReady } = player;
  const isGameMaster = player.id === game.masterId;

  const handleSize = (event, index, value) => {
    dispatch(socketUpdateGame(game.id, { size: value }));
  };

  const handleMaxPlayer = (event, index, value) => {
    dispatch(socketUpdateGame(game.id, { maxPlayers: value }));
  };

  const handleSpeed = (event, index, value) => {
    dispatch(socketUpdateGame(game.id, { speed: value }));
  };

  const handleVisibility = (event, checked) => {
    dispatch(socketUpdateGame(game.id, { isFullVisibility: checked }));
  };

  const handleWait = (event, checked) => {
    dispatch(socketUpdateGame(game.id, { isPieceSynchro: checked }));
  };

  const handleStart = () => {
    console.log('START');
    /*
    ** Start Game
    */
  };

  const handleCancel = () => {
    socket.closeClient();
    dispatch(updateGame(null));
  };

  const handleReady = () => {
    dispatch(socketUpdatePlayer({ isReady: !isReady }));
  };

  return (
    <div className="game-settings">
      <section>
        <h1>Game Settings</h1>
        <SelectField
          floatingLabelText="Maximum Players"
          value={game.maxPlayers}
          onChange={handleMaxPlayer}
          disabled={!isGameMaster}
        >
          <MenuItem value={1} primaryText="1" />
          <MenuItem value={2} primaryText="2" />
          <MenuItem value={3} primaryText="3" />
          <MenuItem value={4} primaryText="4" />
          <MenuItem value={5} primaryText="5" />
        </SelectField>
        <SelectField
          floatingLabelText="Game speed"
          value={game.speed}
          onChange={handleSpeed}
          disabled={!isGameMaster}
        >
          <MenuItem value="Slow" primaryText="Slow" />
          <MenuItem value="Normal" primaryText="Normal" />
          <MenuItem value="Fast" primaryText="Fast" />
          <MenuItem value="Very Fast" primaryText="Very Fast" />
        </SelectField>
        <SelectField
          floatingLabelText="Game size"
          value={game.size}
          onChange={handleSize}
          disabled={!isGameMaster}
        >
          <MenuItem value="Small" primaryText="Small" />
          <MenuItem value="Normal" primaryText="Normal" />
          <MenuItem value="Big" primaryText="Big" />
          <MenuItem value="Very Big" primaryText="Very Big" />
        </SelectField>
      </section>
      <section>
        <h1>Game Mode</h1>
        <Toggle label="Full Visibility" onToggle={handleVisibility} labelPosition="right" style={toggleStyle} toggled={game.isFullVisibility} disabled={!isGameMaster} />
        <Toggle label="Wait for all players before dealing new piece" onToggle={handleWait} labelPosition="right" style={toggleStyle} toggled={game.isPieceSynchro} disabled={!isGameMaster} />
      </section >
      <section>
        {isGameMaster && <RaisedButton label="START" style={{ marginRight: 20 }} onClick={handleStart} />}
        <RaisedButton label="CANCEL" secondary style={{ marginRight: 20 }} onClick={handleCancel} />
        <RaisedButton label={isReady ? 'NOT READY' : 'READY'} onClick={handleReady} primary={isReady} secondary={!isReady} />
      </section>
    </div>
  );
};

GameSettings.propTypes = {
  game: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  player: PropTypes.object.isRequired,
};

export default GameSettings;
