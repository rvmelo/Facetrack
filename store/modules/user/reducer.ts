import { Reducer } from 'redux';
import produce from 'immer';
import { ActionTypes, IUser } from './types';

const INITIAL_STATE: IUser = {
  id: '',
  name: '',
  birthDate: '',
  sex: undefined,
  relationshipStatus: undefined,
  sexualOrientation: undefined,
};

const user: Reducer<IUser> = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case ActionTypes.authenticateUser: {
        Object.assign(draft, {
          id: 1,
          name: 'Roberto',
          birthDate: '',
          sex: 'male',
          relationshipStatus: 'serious relationship',
          sexualOrientation: 'heterossexual',
        });

        return draft;
      }
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
