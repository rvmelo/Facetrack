import { Reducer } from 'redux';
import produce from 'immer';
import { ActionTypes, IUserState } from './types';

export const INITIAL_STATE: IUserState = {
  user: {
    userProviderId: '',
    avatar: '',
    name: '',
    birthDate: undefined,
    sex: undefined,
    relationshipStatus: undefined,
    sexualOrientation: undefined,
    instagram: undefined,
  },
  isAvatarLoading: false,
};

const user: Reducer<IUserState> = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case ActionTypes.loadUser: {
        Object.assign(draft, { user: { ...action.payload } });
        return draft;
      }
      case ActionTypes.updateAvatar: {
        Object.assign(draft, {
          user: { ...draft.user, avatar: action.payload },
        });
        return draft;
      }
      case ActionTypes.updateUser: {
        Object.assign(draft, { user: { ...action.payload } });
        return draft;
      }
      default: {
        return draft;
      }
    }
  });
};

export default user;
