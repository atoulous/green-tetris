import React from 'react';
import PropTypes from 'prop-types';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';

import './GameSettings.scss';


const GameSettings = ({ game, dispatch }) => {
  const toggleStyle = {
    marginBottom: 15,
  };

  const handleMaxPlayer = (e) => {
    console.log('MAX-PLAYERS:', e);
    /*
    ** Change state here with dispatch
    */
  };

  const handleSpeed = (e) => {
    console.log('SPEED:', e);
    /*
    ** Change state here with dispatch
    */
  };

  const handleVisibility = (e) => {
    console.log('VISIBILITY:', e);
    /*
    ** Change state here with dispatch
    */
  };

  const handleWait = (e) => {
    console.log('WAIT:', e);
    /*
    ** Change state here with dispatch
    */
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
          <MenuItem value={1500} primaryText="Slow" />
          <MenuItem value={1000} primaryText="Normal" />
          <MenuItem value={800} primaryText="Fast" />
          <MenuItem value={600} primaryText="Very Fast" />
        </SelectField>
      </section>
      <section>
        <h1>Game Mode</h1>
        <Toggle label="Full Visibility" onToggle={handleVisibility} labelPosition="right" style={toggleStyle} />
        <Toggle label="Wait for all players before dealing new piece" onToggle={handleWait} labelPosition="right" style={toggleStyle} />
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
