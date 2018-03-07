import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import renderer from 'react-test-renderer';

import GameSettings from '../../../src/client/components/GameSettings/GameSettings';

it('renders is ready ok', () => {
  const tree = renderer
    .create(
      <MuiThemeProvider>
        <GameSettings
          isSolo
          dispatch={() => (false)}
          player={{ id: 'oijoijoij', isReady: true }}
          game={{
        id: 'oijoijoij',
        hasStarted: false,
        masterId: 'oijoijoij',
        speed: { label: 'Normal' },
        size: { label: 'Normal' },
        maxPlayers: 3,
        players: []
      }
      }
        />
      </MuiThemeProvider>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

