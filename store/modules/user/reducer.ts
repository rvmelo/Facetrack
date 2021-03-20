import { Reducer } from 'redux';
import produce from 'immer';
import { ActionTypes, IUser } from './types';

const INITIAL_STATE: IUser = {
  userProviderId: '',
  name: '',
  birthDate: '',
  sex: undefined,
  relationshipStatus: undefined,
  sexualOrientation: undefined,
  instagram: undefined,
};

const user: Reducer<IUser> = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case ActionTypes.updateUser: {
        Object.assign(draft, { ...action.payload });
        return draft;
      }
      default: {
        return draft;
      }
    }
  });
};

export default user;
