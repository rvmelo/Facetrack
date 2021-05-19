// /* eslint-disable no-undef */
// import { all, call, put, takeLatest } from 'redux-saga/effects';
// import { AxiosResponse } from 'axios';
// import { ActionTypes, IUser } from './types';

// import api from '../../../services/api';

// import { updateAvatar, loadUser } from './actions';

// type UpdateAvatarRequest = ReturnType<typeof updateAvatar>;

// function* handleAvatarUpdate({ payload }: UpdateAvatarRequest) {
//   const fileType = payload.substring(payload.lastIndexOf('.') + 1);

//   const data = new FormData();

//   data.append(
//     'avatar',
//     JSON.parse(
//       JSON.stringify({
//         uri: payload,
//         type: `image/${fileType}`,
//         name: `photo.${fileType}`,
//       }),
//     ),
//   );

//   const response: AxiosResponse<IUser> = yield call(
//     api.patch,
//     '/users/avatar',
//     data,
//   );
//   yield put(loadUser({ ...response.data }));
// }

// export default all([takeLatest(ActionTypes.updateAvatar, handleAvatarUpdate)]);
