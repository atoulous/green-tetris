import React from 'react';
import thunk from 'redux-thunk';
import Enzyme, { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';

import { initialState } from '../../../src/client/reducers/index';
import Game from '../../../src/client/containers/Game/Game';

Enzyme.configure({ adapter: new Adapter() });

describe('containers/Game', () => {
  const mockStore = configureStore([thunk]);

  const wrapper = shallow(<Game store={mockStore(initialState)} />);

  it('should render', () => {
    expect(wrapper).toBeTruthy();
  });

  it('should render child components', () => {
  });
});

