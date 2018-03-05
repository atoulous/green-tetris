import React from 'react';
import renderer from 'react-test-renderer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import GamePlayers from '../../../src/client/components/GamePlayers/GamePlayers';

it('', () => {
  const tree = renderer
    .create(
      <MuiThemeProvider>
        <GamePlayers
          dispatch={() => false}
          player={{ id: 'oijoijoij', isReady: true }}
          game={{
        id: 'oijoijoij',
        hasStarted: false,
        masterId: 'oijoijoij',
        speed: { label: 'Normal' },
        size: { label: 'Normal' },
        maxPlayers: 3,
        players: [
          { nickname: 'thibault1', id: '1', isReady: true },
          { nickname: 'thibault2', id: '2', isReady: true },
          { nickname: 'thibault3', id: '3', isReady: true },
          { nickname: 'thibault4', id: '4', isReady: true },
        ]
      }}
        />
      </MuiThemeProvider>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

