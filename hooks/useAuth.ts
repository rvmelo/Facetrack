/* eslint-disable no-unused-vars */
import { useCallback, useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

//  redux
import { useDispatch } from 'react-redux';
import { loadUser } from '../store/modules/user/actions';
import { IUser } from '../store/modules/user/types';
import { INITIAL_STATE } from '../store/modules/user/reducer';

//  services
import api from '../services/api';

//   constants
import {
  faceTrackTokenKey,
  faceTrackUserKey,
  notificationTokenKey,
} from '../constants/storage';

interface SignInData {
  token: string;
  user: IUser;
}

interface SignUpData {
  user: IUser;
}

interface ReturnValue {
  isLoading: boolean;
  signIn(data: SignInData): Promise<void>;
  signUp(data: SignUpData): Promise<void>;
  signOut(): Promise<void>;
  handleUserUpdate(user: IUser): Promise<void>;
  handleAutoSignIn(): Promise<void>;
}

function useAuth(): ReturnValue {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  const isMounted = useRef<boolean | null>(null);

  const handleAutoSignIn = useCallback(async () => {
    if (!isMounted?.current) return;

    setIsLoading(true);

    // await AsyncStorage.multiRemove(['@Facetrack:token', '@Facetrack:user']);

    const [token, user] = await AsyncStorage.multiGet([
      '@Facetrack:token',
      '@Facetrack:user',
    ]);

    isMounted.current && setIsLoading(false);

    if (!token[1] || !user[1]) return;

    api.defaults.headers.authorization = `Bearer ${token[1]}`;

    const parsedUser = JSON.parse(user[1]);

    dispatch(
      loadUser({
        ...parsedUser,
      }),
    );
  }, [dispatch]);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  const signIn = useCallback(
    async ({ token, user }) => {
      api.defaults.headers.authorization = `Bearer ${token}`;

      await AsyncStorage.multiSet([
        [faceTrackTokenKey, token],
        [faceTrackUserKey, JSON.stringify(user)],
      ]);

      dispatch(
        loadUser({
          ...user,
        }),
      );
    },
    [dispatch],
  );

  const signUp = useCallback(
    async ({ user }) => {
      const response = await api.post('/users', user);

      const { token } = response.data;

      api.defaults.headers.authorization = `Bearer ${token}`;

      await AsyncStorage.multiSet([
        [faceTrackTokenKey, token],
        [faceTrackUserKey, JSON.stringify(user)],
      ]);

      dispatch(
        loadUser({
          ...user,
        }),
      );
    },
    [dispatch],
  );

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove([
      faceTrackTokenKey,
      faceTrackUserKey,
      notificationTokenKey,
    ]);

    dispatch(
      loadUser({
        ...INITIAL_STATE.user,
      }),
    );
  }, [dispatch]);

  const handleUserUpdate = useCallback(async (user: IUser) => {
    await AsyncStorage.setItem(faceTrackUserKey, JSON.stringify(user));

    // new dispatch function to update user locally and on database

    // dispatch(
    //   updateUser({
    //     ...INITIAL_STATE,
    //   }),
    // );
  }, []);

  return {
    isLoading,
    signIn,
    signUp,
    signOut,
    handleUserUpdate,
    handleAutoSignIn,
  };
}

export default useAuth;
