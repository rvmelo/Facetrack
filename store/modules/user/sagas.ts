import { all, call, takeLatest } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { ActionTypes, IUser } from './types';
import { updateUser } from './actions';

import api from '../../../services/api';

type UpdatedUserRequest = ReturnType<typeof updateUser>;

function* handleUserUpdate({ payload }: UpdatedUserRequest) {
  // if user is not registered do not send updated user to db

  const foundUser: AxiosResponse<IUser | undefined> = yield call(
    api.get,
    `/users/${payload.userProviderId}`,
  );

  if (!foundUser.data) return;

  yield call(api.post, '/users', payload);
}

export default all([takeLatest(ActionTypes.updateUser, handleUserUpdate)]);
