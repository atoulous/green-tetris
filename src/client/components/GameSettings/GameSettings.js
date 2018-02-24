import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';
import * as socket from '../../socket';


import './GameSettings.scss';

import actions from '../../actions';

const { socketUpdateGame, updateGame, socketUpdatePlayer, socketStartGame } = actions;


const GameSettings = ({ game, dispatch, player }) => {
  if (game.hasStarted) return <Redirect to="/play" />;


  const speedItems = [
    { label: 'Slow', value: 1500 },
    { label: 'Normal', value: 1000 },
    { label: 'Fast', value: 700 },
    { label: 'Very Fast', value: 300 },
  ];

  const sizeItems = [
    { label: 'Small', value: 15 },
    { label: 'Normal', value: 21 },
    { label: 'Big', value: 24 },
    { label: 'Very Big', value: 27 },
  ];


  const toggleStyle = {
    marginBottom: 15,
  };

  const { isReady } = player;
  const isGameMaster = player.id === game.masterId;

  const handleSize = (event, index, value) => {
    dispatch(socketUpdateGame(game.id, { size: sizeItems.find(s => s.label === value) }));
  };

  const handleMaxPlayer = (event, index, value) => {
    dispatch(socketUpdateGame(game.id, { maxPlayers: value }));
  };

  const handleSpeed = (event, index, value) => {
    dispatch(socketUpdateGame(game.id, { speed: speedItems.find(s => s.label === value) }));
  };

  const handleStart = () => {
    dispatch(socketStartGame(game.id));
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
          value={game.speed.label}
          onChange={handleSpeed}
          disabled={!isGameMaster}
        >
          {speedItems.map((item, index) => (<MenuItem key={index} value={item.label} primaryText={item.label} />))}
        </SelectField>
        <SelectField
          floatingLabelText="Game size"
          value={game.size.label}
          onChange={handleSize}
          disabled={!isGameMaster}
        >
          {sizeItems.map((item, index) => (<MenuItem key={index} value={item.label} primaryText={item.label} />))}
        </SelectField>
      </section>
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
