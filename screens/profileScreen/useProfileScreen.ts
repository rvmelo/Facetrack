import { useState, useEffect, useCallback } from 'react';
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
}

export function useProfileScreen(): ReturnType {
  const dispatch = useDispatch();

  const [isRefreshing, setIsRefreshing] = useState(false);

  const { user, isAvatarLoading, isUserUpdateFailure, isUserLoading } =
    useSelector<IState, IUserState>(state => state.user);

  const onUserLoading = useCallback(async () => {
    setIsRefreshing(true);

    const response: AxiosResponse<IUser> = await api.get(
      `users/${user.userProviderId}`,
    );

    const { rate } = response?.data || {};

    setIsRefreshing(false);

    if (!rate) return;

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
  };
}
