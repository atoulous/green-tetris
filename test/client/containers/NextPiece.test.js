import React from 'react';
import thunk from 'redux-thunk';
import Enzyme, { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';

import { initialState } from '../../../src/client/reducers/index';
import NextPiece from '../../../src/client/containers/NextPiece/NextPiece';

Enzyme.configure({ adapter: new Adapter() });

describe('containers/NextPiece', () => {
  const mockStore = configureStore([thunk]);

  const wrapper = mount(<NextPiece store={mockStore(initialState)} />);

  it('should render', () => {
    expect(wrapper).toBeTruthy();
  });

  it('should render child components', () => {
    expect(wrapper.find('div.nextPiece')).toHaveLength(1);
  });
});

