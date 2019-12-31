import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';
import api from '~/services/api';

import { signInSuccess, signInFailure } from './actions';

export function* signIn({ payload }) {
  const { id } = payload;

  const response = yield call(api.get, `students/${id}`);
  const { student } = response.data;

  if (student) {
    yield put(signInSuccess(student));
  } else {
    Alert.alert('Falha na autenticação, verifique o ID informado!');
    yield put(signInFailure());
  }
}

export function signOut() {}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
