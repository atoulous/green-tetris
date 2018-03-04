import reducer, { initialState } from '../../../src/client/reducers';
import * as actions from '../../../src/client/actions/player';

describe('update nickname', () => {
  it('should update nickname', () => {
    expect(reducer(initialState, actions.updateNickname('thibault')))
      .toEqual({ ...initialState, player: { ...initialState.player, nickname: 'thibault' } });
  });
});

describe('update player id', () => {
  it('should update player id', () => {
    expect(reducer(initialState, actions.updatePlayerId('oijoijoij')))
      .toEqual({ ...initialState, player: { ...initialState.player, id: 'oijoijoij' } });
  });
});

describe('open modal', () => {
  it('should open modal', () => {
    expect(reducer(initialState, actions.openNicknameModal()))
      .toEqual({ ...initialState, isNicknameModalOpen: true });
  });
});

describe('close modal', () => {
  it('should close modal', () => {
    expect(reducer(initialState, actions.closeNicknameModal()))
      .toEqual({ ...initialState, isNicknameModalOpen: false });
  });
});
