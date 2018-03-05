import React from 'react';
import thunk from 'redux-thunk';
import Enzyme, { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';

import { initialState } from '../../../src/client/reducers/index';
import AllGamesView from '../../../src/client/containers/AllGamesView/AllGamesView';

Enzyme.configure({ adapter: new Adapter() });

describe('containers/AllGamesView', () => {
  const mockStore = configureStore([thunk]);

  global.fetch = jest.fn(() => new Promise(resolve => resolve()));

  const wrapper = shallow(<AllGamesView store={mockStore(initialState)} />);

  it('should render', () => {
    expect(wrapper).toBeTruthy();
  });

  it('should render child components', () => {
  });
});

