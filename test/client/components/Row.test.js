import React from 'react';
import renderer from 'react-test-renderer';

import Row from '../../../src/client/components/Row/Row';

it('row with row props number', () => {
  const tree = renderer
    .create(<Row width={20} row={12} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('row with row props array', () => {
  const tree = renderer
    .create(<Row width={20} row={[{ fill: true, color: 'cyan' }, { fill: false, color: 'cyan' }, { fill: true, color: 'red' }, { fill: true, color: 'green' }]} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
