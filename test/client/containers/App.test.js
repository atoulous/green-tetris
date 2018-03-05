import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { initialState } from '../../../src/client/reducers';

import App from '../../../src/client/components/App';
import Layout from '../../../src/client/components/Layout/Layout';
import Home from '../../../src/client/components/Home/Home';
import AllGamesView from '../../../src/client/containers/AllGamesView/AllGamesView';
import GameSettingsView from '../../../src/client/containers/GameSettingsView/GameSettingsView';
import TetrisView from '../../../src/client/containers/TetrisView/TetrisView';
import Error from '../../../src/client/containers/Error/Error';

Enzyme.configure({ adapter: new Adapter() });

function setup(path) {
  const props = {
    props: jest.fn()
  };

  const mockStore = configureStore([thunk]);

  const enzymeWrapper = mount(
    <Provider store={mockStore(initialState)}>
      <MuiThemeProvider>
        <MemoryRouter initialEntries={[path]} initialIndex={0}>
          <App />
        </MemoryRouter>
      </MuiThemeProvider>
    </Provider>
  );

  return {
    props,
    enzymeWrapper
  };
}

// i dont know why initialEntries={[path]} of MemoryRouter is not working here

describe('components', () => {
  describe('App', () => {
    it('should render self and subcomponents on path "/"', () => {
      const { enzymeWrapper } = setup('/');

      expect(enzymeWrapper.find(Layout)).toHaveLength(1);
      expect(enzymeWrapper.find(Error)).toHaveLength(1);

      expect(enzymeWrapper.find(Home)).toHaveLength(1);
      expect(enzymeWrapper.find(AllGamesView)).toHaveLength(0);
      expect(enzymeWrapper.find(GameSettingsView)).toHaveLength(0);
      expect(enzymeWrapper.find(TetrisView)).toHaveLength(0);
    });

    // it('should render self and subcomponents on path "/games"', () => {
    // const { enzymeWrapper } = setup('/games');
    //
    // expect(enzymeWrapper.contains(Layout)).toBe(true);
    // expect(enzymeWrapper.contains(Error)).toBe(true);
    //
    // expect(enzymeWrapper.find(Home)).toHaveLength(0);
    // expect(enzymeWrapper.find(AllGamesView)).toHaveLength(0);
    // expect(enzymeWrapper.find(GameSettingsView)).toHaveLength(0);
    // expect(enzymeWrapper.find(TetrisView)).toHaveLength(1);

    // expect(enzymeWrapper.contains(Home)).toBe(false);
    // expect(enzymeWrapper.contains(AllGamesView)).toBe(true);
    // expect(enzymeWrapper.contains(GameSettingsView)).toBe(false);
    // expect(enzymeWrapper.contains(TetrisView)).toBe(false);
    // });

    // it('should render self and subcomponents on path "/games/:id"', () => {
    // const { enzymeWrapper } = setup('/games/:id');
    //
    // expect(enzymeWrapper.contains(Layout)).toBe(true);
    // expect(enzymeWrapper.contains(Error)).toBe(true);
    //
    // expect(enzymeWrapper.contains(Home)).toBe(false);
    // expect(enzymeWrapper.contains(AllGamesView)).toBe(false);
    // expect(enzymeWrapper.contains(GameSettingsView)).toBe(true);
    // expect(enzymeWrapper.contains(TetrisView)).toBe(false);
    // });

    // it('should render self and subcomponents on path "/play"', () => {
    //   const { enzymeWrapper } = setup('/play');
    //
    //   expect(enzymeWrapper.contains(Layout)).toBe(true);
    //   expect(enzymeWrapper.contains(Error)).toBe(true);
    //
    //   expect(enzymeWrapper.contains(Home)).toBe(false);
    //   expect(enzymeWrapper.contains(AllGamesView)).toBe(false);
    //   expect(enzymeWrapper.contains(GameSettingsView)).toBe(false);
    //   expect(enzymeWrapper.contains(TetrisView)).toBe(true);
    // });
  });
});
