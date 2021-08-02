/* eslint-disable no-undef */
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../../services/api';

import { ActionTypes, IUser } from './types';
import {
  updateUserRequest,
  updateUserSuccess,
  updateUserFailure,
  updateUserLoadState,
  updateAvatarRequest,
  updateAvatarSuccess,
  updateAvatarFailure,
  updateAvatarLoading,
} from './actions';
import { faceTrackUserKey } from '../../../constants/storage';

type UpdateUserRequest = ReturnType<typeof updateUserRequest>;
type UpdateAvatarRequest = ReturnType<typeof updateAvatarRequest>;

async function StoreUser(user: IUser) {
  AsyncStorage.setItem(faceTrackUserKey, JSON.stringify(user));
}

function* handleUserUpdate({ payload }: UpdateUserRequest) {
  try {
    yield put(updateUserLoadState(true));

    const response: AxiosResponse<IUser> = yield call(
      api.patch,
      '/users',
      payload,
    );

    yield call(StoreUser, response.data);

    yield put(updateUserLoadState(false));
    yield put(updateUserSuccess(payload));
  } catch (err) {
    yield put(updateUserLoadState(false));
    yield put(updateUserFailure());
  }
}

function* handleAvatarUpdate({ payload }: UpdateAvatarRequest) {
  const localAvatarUri = payload;

  try {
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

    yield put(updateAvatarLoading(true));

    const response: AxiosResponse<IUser> = yield call(
      api.patch,
      '/users/avatar',
      data,
    );

    yield call(StoreUser, response.data);

    yield put(updateAvatarLoading(false));
    yield put(updateAvatarSuccess(response.data.avatar));
  } catch (err) {
    yield put(updateAvatarLoading(false));
    yield put(updateAvatarFailure());
  }
}

export default all([
  takeLatest(ActionTypes.updateUserRequest, handleUserUpdate),
  takeLatest(ActionTypes.updateAvatarRequest, handleAvatarUpdate),
]);
