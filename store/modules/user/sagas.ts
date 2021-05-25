/* eslint-disable no-undef */
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { ActionTypes, IUser } from './types';

import api from '../../../services/api';

import { loadUser, updateUser } from './actions';

type UpdateUserRequest = ReturnType<typeof updateUser>;

function* handleUserUpdate({ payload }: UpdateUserRequest) {
  const { localAvatarUri, user } = payload;

  yield call(api.patch, '/users', user);

  if (!localAvatarUri) return;

  const fileType = localAvatarUri.substring(
    localAvatarUri.lastIndexOf('.') + 1,
  );

  const data = new FormData();

  data.append(
    'avatar',
    JSON.parse(
      JSON.stringify({
        uri: localAvatarUri,
        type: `image/${fileType}`,
        name: `photo.${fileType}`,
      }),
    ),
  );

  const response: AxiosResponse<IUser> = yield call(
    api.patch,
    '/users/avatar',
    data,
  );

  yield put(loadUser({ ...response.data }));
}

export default all([takeLatest(ActionTypes.updateUser, handleUserUpdate)]);
