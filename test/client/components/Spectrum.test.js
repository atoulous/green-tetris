import React from 'react';
import renderer from 'react-test-renderer';

import Spectrum from '../../../src/client/components/Spectrum/Spectrum';

it('renders ok', () => {
  const tree = renderer
    .create(<Spectrum spectrum={[12, 14, 3, 0, 0, 0, 8]} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

