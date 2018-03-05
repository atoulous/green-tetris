import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import Enzyme, { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { initialState } from '../../../src/client/reducers/index';
import Nav from '../../../src/client/containers/Nav/Nav';

Enzyme.configure({ adapter: new Adapter() });

describe('containers/Nav', () => {
  const mockStore = configureStore([thunk]);

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
          <Nav />
        </MemoryRouter>
      </MuiThemeProvider>
    </Provider>
  );


  it('should render', () => {
    // wrapper.find('IconButton').simulate('click');
    expect(wrapper).toBeTruthy();
  });

});

