import reducer, { initialState } from '../../../src/client/reducers';
import * as actions from '../../../src/client/actions/error';

describe('toggle muted', () => {
  it('should toggle muted', () => {
    expect(reducer(initialState, actions.updateError('erreur')))
      .toEqual({ ...initialState, error: 'erreur' });
  });
});

