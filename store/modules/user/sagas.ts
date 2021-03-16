import { all, takeLatest } from 'redux-saga/effects';
import { ActionTypes } from './types';

function checkUserAuthentication() {
  console.log('authenticating user...');
}

function checkUserUpdate() {
  // if user is not registered do not send updated user to db
  console.log('updating user');
}

export default all([
  takeLatest(ActionTypes.authenticateUser, checkUserAuthentication),
  takeLatest(ActionTypes.updateUser, checkUserUpdate),
]);
