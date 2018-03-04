import * as actions from '../../../src/client/actions/error';

describe('UPDATE_ERROR', () => {
  it('should create an action updateError', () => {
    const error = 'thibault';
    const expectedAction = {
      type: actions.UPDATE_ERROR,
      error
    };
    expect(actions.updateError(error))
      .toEqual(expectedAction);
  });
});

