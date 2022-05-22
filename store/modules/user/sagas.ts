/* eslint-disable no-undef */
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

async function uploadAvatar(localAvatarUri: string) {
  const fileType = localAvatarUri.substring(
    localAvatarUri.lastIndexOf('.') + 1,
  );

  const formData = new FormData();

  formData.append(
    'avatar',
    JSON.parse(
      JSON.stringify({
        uri: localAvatarUri,
        type: `image/${fileType}`,
        name: `photo.${fileType}`,
      }),
    ),
  );

  // This is because FormData is broken: https://stackoverflow.com/questions/71321756/react-native-expo-axios-file-upload-not-working-because-axios-is-not-sending
  const response: AxiosResponse<IUser> = await api.patch(
    '/users/avatar',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      transformRequest: () => {
        return formData; // this is doing the trick
      },
    },
  );

  return response;
}

function* handleAvatarUpdate({ payload }: UpdateAvatarRequest) {
  const localAvatarUri = payload;

  try {
    if (!localAvatarUri) return;

    yield put(updateAvatarLoading(true));

    const response: AxiosResponse<IUser> = yield call(
      uploadAvatar,
      localAvatarUri,
    );

    yield call(StoreUser, response?.data);

    yield put(updateAvatarLoading(false));
    yield put(updateAvatarSuccess(response?.data?.avatar));
  } catch (err) {
    yield put(updateAvatarLoading(false));
    yield put(updateAvatarFailure());
  }
}

export default all([
  takeLatest(ActionTypes.updateUserRequest, handleUserUpdate),
  takeLatest(ActionTypes.updateAvatarRequest, handleAvatarUpdate),
]);
