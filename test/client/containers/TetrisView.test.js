import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Enzyme, { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { initialState } from '../../../src/client/reducers/index';
import TetrisView from '../../../src/client/containers/TetrisView/TetrisView';
import EndGame from '../../../src/client/components/EndGame/EndGame';

Enzyme.configure({ adapter: new Adapter() });

describe('containers/TetrisView', () => {
  const mockStore = configureStore([thunk]);

  it('should render container', () => {
    const wrapper = mount(
      <Provider store={mockStore({
        ...initialState,
        game: {
          id: '33',
          hasStarted: true,
          players: [
            { playerId: 'player1',
              webRTCId: '1',
              score: 0
            },
            { playerId: 'player2',
              webRTCId: '2',
              score: 0
            }
          ]
        },
        player: { id: 'playerId' },
        onPause: false,
        isListeningKey: true
      })}
      >
        <MuiThemeProvider>
          <MemoryRouter>
            <TetrisView />
          </MemoryRouter>
        </MuiThemeProvider>
      </Provider>
    );

    expect(wrapper).toBeTruthy();
  });

  it('should render child components EndGame because game is end', () => {
    const wrapper = mount(
      <Provider store={mockStore({
        ...initialState,
        game: {
          id: '33',
          hasStarted: true,
          players: [
            { playerId: 'player1',
              webRTCId: '1',
              score: 0
            },
            { playerId: 'player2',
              webRTCId: '2',
              score: 0
            }
          ]
        },
        player: { id: 'playerId' },
        onPause: false,
        hasWon: true,
        isListeningKey: true
      })}
      >
        <MuiThemeProvider>
          <MemoryRouter>
            <TetrisView />
          </MemoryRouter>
        </MuiThemeProvider>
      </Provider>
    );

    expect(wrapper).toBeTruthy();
    expect(wrapper.find(EndGame)).toHaveLength(1);
  });

  it('should render but redirect because game is missing', () => {
    const wrapper = mount(
      <Provider store={mockStore({
        ...initialState,
        player: { id: 'playerId' },
        onPause: false,
        hasWon: true,
        isListeningKey: true
      })}
      >
        <MuiThemeProvider>
          <MemoryRouter>
            <TetrisView />
          </MemoryRouter>
        </MuiThemeProvider>
      </Provider>
    );

    expect(wrapper).toBeTruthy();
  });

  it('should render but redirect because game.hasStarted is false', () => {
    const wrapper = mount(
      <Provider store={mockStore({
        ...initialState,
        game: {
          id: '33',
          hasStarted: false,
          players: [
            { playerId: 'player1',
              webRTCId: '1',
              score: 0
            },
            { playerId: 'player2',
              webRTCId: '2',
              score: 0
            }
          ]
        },
        player: { id: 'playerId' },
        onPause: false,
        hasWon: true,
        isListeningKey: true
      })}
      >
        <MuiThemeProvider>
          <MemoryRouter>
            <TetrisView />
          </MemoryRouter>
        </MuiThemeProvider>
      </Provider>
    );

    expect(wrapper).toBeTruthy();
  });
});
