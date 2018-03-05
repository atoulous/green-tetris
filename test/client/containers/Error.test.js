import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Enzyme, { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { initialState } from '../../../src/client/reducers/index';
import Error from '../../../src/client/containers/Error/Error';

Enzyme.configure({ adapter: new Adapter() });

describe('containers/Error', () => {
  const mockStore = configureStore([thunk]);

  it('should render', () => {
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
            <Error />
          </MemoryRouter>
        </MuiThemeProvider>
      </Provider>
    );

    expect(wrapper).toBeTruthy();
  });
});

