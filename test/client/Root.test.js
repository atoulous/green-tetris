import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Root from '../../src/client/Root';

Enzyme.configure({ adapter: new Adapter() });

describe('client/Root', () => {
  it('should render successfully', () => {
    const wrapper = shallow(<Root />);

    expect(wrapper).toHaveLength(1);
  });
});
