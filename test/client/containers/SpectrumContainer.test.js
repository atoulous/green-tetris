import React from 'react';
import thunk from 'redux-thunk';
import Enzyme, { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';

import { initialState } from '../../../src/client/reducers/index';
import SpectrumContainer from '../../../src/client/containers/SpectrumContainer/SpectrumContainer';

Enzyme.configure({ adapter: new Adapter() });

describe('containers/SpectrumContainer', () => {
  const mockStore = configureStore([thunk]);

  const wrapper = shallow(<SpectrumContainer store={mockStore(initialState)} />);

  it('should render', () => {
    expect(wrapper).toBeTruthy();
  });
});

