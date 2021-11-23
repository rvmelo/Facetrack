import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
} from 'react-native';
import { AxiosResponse } from 'axios';

//  redux
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../../store';
import { IUser, IUserState } from '../../store/modules/user/types';
import { updateUserRate } from '../../store/modules/user/actions';

//  services
import api from '../../services/api';

interface ReturnType {
  onUserLoading: () => Promise<void>;
  isRefreshing: boolean;
  isAvatarLoading: boolean;
  isUserUpdateFailure: boolean;
  isUserLoading: boolean;
  user: IUser;
  scroll: React.RefObject<ScrollView>;
  isCloseToEnd: (
    // eslint-disable-next-line no-unused-vars
    nativeEvent: NativeSyntheticEvent<NativeScrollEvent>,
  ) => void;
  displayModal: boolean;
}

export function useProfileScreen(): ReturnType {
  const dispatch = useDispatch();

  const [isRefreshing, setIsRefreshing] = useState(false);

  const [displayModal, setDisplayModal] = useState(false);

  const scroll = useRef<ScrollView>(null);

  const isMounted = useRef<boolean | null>(null);

  const { user, isAvatarLoading, isUserUpdateFailure, isUserLoading } =
    useSelector<IState, IUserState>(state => state.user);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  const isCloseToEnd = useCallback(
    ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;

      const paddingToRight = 20;

      setDisplayModal(
        layoutMeasurement.width + contentOffset.x >=
          contentSize.width - paddingToRight,
      );
    },
    [],
  );

  const onUserLoading = useCallback(async () => {
    setIsRefreshing(true);

    const response: AxiosResponse<{ rate: number }> = await api.get(
      `users/update-rate/${user.userProviderId}`,
    );

    const { rate } = response?.data || {};

    isMounted.current && setIsRefreshing(false);

    if (rate === undefined) return;

    dispatch(updateUserRate(rate));
  }, [dispatch, user.userProviderId, setIsRefreshing]);

  useEffect(() => {
    onUserLoading();
  }, [onUserLoading]);

  return {
    onUserLoading,
    isRefreshing,
    isAvatarLoading,
    isUserUpdateFailure,
    isUserLoading,
    user,
    scroll,
    isCloseToEnd,
    displayModal,
  };
}
