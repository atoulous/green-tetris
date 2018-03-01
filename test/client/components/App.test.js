import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';

import App from '../../../src/client/components/App';

describe('client/components/App', () => {
  const mockStore = configureStore([thunk]);

  // todo: AudioContainer is code with ass

  it('should render successfully', () => {
    const wrapper = mount(
      <Provider store={mockStore()}>
        <App><h1>Hello</h1></App>
      </Provider>
    );

    console.log('wrapper==', wrapper);
    expect(wrapper).toHaveProperty('h1', 'Hello');
  });
});
