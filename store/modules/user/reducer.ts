import { Reducer } from 'redux';
import produce from 'immer';
import { ActionTypes, IUser } from './types';

const INITIAL_STATE: IUser = {
  id: '',
  name: 'null',
  age: 0,
  sex: 'null',
  sexualOrientation: 'null',
};

const user: Reducer<IUser> = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case ActionTypes.authenticateUser: {
        Object.assign(draft, {
          id: 1,
          name: 'Roberto',
          age: 32,
          sex: 'male',
          sexualOrientation: 'heterossexual',
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
