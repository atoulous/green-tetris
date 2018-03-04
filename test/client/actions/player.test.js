import * as actions from '../../../src/client/actions/player';

describe('OPEN_NICKNAME_MODAL', () => {
  it('should create an action openNicknameModal', () => {
    const expectedAction = {
      type: actions.OPEN_NICKNAME_MODAL,
    };
    expect(actions.openNicknameModal())
      .toEqual(expectedAction);
  });
});

describe('CLOSE_NICKNAME_MODAL', () => {
  it('should create an action closeNicknameModal', () => {
    const expectedAction = {
      type: actions.CLOSE_NICKNAME_MODAL,
    };
    expect(actions.closeNicknameModal())
      .toEqual(expectedAction);
  });
});

describe('UPDATE_NICKNAME', () => {
  it('should create an action updateNickname', () => {
    const nickname = 'thibault';
    const expectedAction = {
      type: actions.UPDATE_NICKNAME,
      nickname
    };
    expect(actions.updateNickname(nickname))
      .toEqual(expectedAction);
  });
});

describe('UPDATE_PLAYER_ID', () => {
  it('should create an action updatePlayerId', () => {
    const id = 'oijoijoij';
    const expectedAction = {
      type: actions.UPDATE_PLAYER_ID,
      id
    };
    expect(actions.updatePlayerId(id))
      .toEqual(expectedAction);
  });
});

