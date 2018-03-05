import React from 'react';
import renderer from 'react-test-renderer';

import Cell from '../../../src/client/components/Cell/Cell';

it('cell with fill', () => {
  const tree = renderer
    .create(<Cell cell={{ fill: true, color: 'cyan' }} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('color with no fill', () => {
  const tree = renderer
    .create(<Cell cell={{ fill: false, color: 'cyan' }} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
