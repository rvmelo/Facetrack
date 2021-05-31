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
  isAvatarUpdateFailure: false,
  isUserUpdateFailure: false,
};

const user: Reducer<IUserState> = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case ActionTypes.loadUser: {
        Object.assign(draft, { user: { ...action.payload } });
        return draft;
      }
      case ActionTypes.updateAvatarSuccess: {
        Object.assign(draft, {
          user: { ...draft.user, avatar: action.payload },
          isAvatarUpdateFailure: false,
        });
        return draft;
      }
      case ActionTypes.updateAvatarFailure: {
        Object.assign(draft, {
          isAvatarUpdateFailure: true,
        });
        return draft;
      }
      case ActionTypes.updateAvatarLoading: {
        Object.assign(draft, {
          isAvatarLoading: action.payload,
        });
        return draft;
      }
      case ActionTypes.updateUserSuccess: {
        Object.assign(draft, {
          user: { ...action.payload },
          isUserUpdateFailure: false,
        });
        return draft;
      }
      case ActionTypes.updateUserFailure: {
        Object.assign(draft, {
          isUserUpdateFailure: true,
        });
        return draft;
      }
      default: {
        return draft;
      }
    }
  });
};

export default user;
