import React from 'react';
import PropTypes from 'prop-types';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';
import { Redirect } from 'react-router-dom';


import './GameSettings.scss';

import actions from '../../actions';

const { socketUpdateGame } = actions;


const GameSettings = ({ game, dispatch }) => {
  const toggleStyle = {
    marginBottom: 15,
  };

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
    console.log('CANCEL');
    /*
    ** Start Game
    */
  };

  if (!game) return <Redirect to="/games" />;

  return (
    <div className="game-settings">
      <section>
        <h1>Game Settings</h1>
        <SelectField
          floatingLabelText="Maximum Players"
          value={game.maxPlayers}
          onChange={handleMaxPlayer}
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
        >
          <MenuItem value="Small" primaryText="Small" />
          <MenuItem value="Normal" primaryText="Normal" />
          <MenuItem value="Big" primaryText="Big" />
          <MenuItem value="Very Big" primaryText="Very Big" />
        </SelectField>
      </section>
      <section>
        <h1>Game Mode</h1>
        <Toggle label="Full Visibility" onToggle={handleVisibility} labelPosition="right" style={toggleStyle} toggled={game.isFullVisibility} />
        <Toggle label="Wait for all players before dealing new piece" onToggle={handleWait} labelPosition="right" style={toggleStyle} toggled={game.isPieceSynchro} />
      </section >
      <section>
        <RaisedButton label="START" primary style={{ marginRight: 20 }} onClick={handleStart} />
        <RaisedButton label="CANCEL" secondary onClick={handleCancel} />
      </section>
    </div>
  );
};

GameSettings.propTypes = {
  game: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default GameSettings;
