import React from 'react';
import thunk from 'redux-thunk';
import Enzyme, { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';

import { initialState } from '../../../src/client/reducers/index';
import EndGame from '../../../src/client/components/EndGame/EndGame';

Enzyme.configure({ adapter: new Adapter() });

describe('containers/EndGame', () => {
  const mockStore = configureStore([thunk]);

  const wrapper = shallow(<EndGame
    isMaster
    hasWon
    gameId="424324332432"
    dispatch={() => {}}
    store={mockStore(initialState)}
  />);

  it('should render', () => {
    expect(wrapper).toBeTruthy();
  });
});
