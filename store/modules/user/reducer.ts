import { Reducer } from 'redux';
import produce from 'immer';
import { ActionTypes, IUser } from './types';

export const INITIAL_STATE: IUser = {
  userProviderId: '',
  avatar: '',
  name: '',
  birthDate: undefined,
  sex: undefined,
  relationshipStatus: undefined,
  sexualOrientation: undefined,
  instagram: undefined,
};

const user: Reducer<IUser> = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case ActionTypes.loadUser: {
        Object.assign(draft, { ...action.payload });
        return draft;
      }
      case ActionTypes.updateAvatar: {
        Object.assign(draft, { avatar: action.payload });
        return draft;
      }
      default: {
        return draft;
      }
    }
  });
};

export default user;
