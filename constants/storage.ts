export const faceTrackUserKey = '@Facetrack:user';
export const faceTrackTokenKey = '@Facetrack:token';
export const notificationTokenKey = '@Facetrack:notificationToken';
export const userLocationKey = '@Facetrack:userLocation';
export const introMessagesKey = '@Facetrack:introMessages';

export const instagramTokenKey = (userProviderId: string): string =>
  `@Facetrack:${userProviderId}-instagramToken`;
export const instagramRequestDateKey = (userProviderId: string): string =>
  `@Facetrack:${userProviderId}-lastInstagramRequestDate`;
