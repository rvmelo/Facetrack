import { all, takeLatest } from 'redux-saga/effects';
import { ActionTypes } from './types';

function checkUserAuthentication() {
  console.log('authenticating user...');
}

export default all([
  takeLatest(ActionTypes.authenticateUser, checkUserAuthentication),
]);
