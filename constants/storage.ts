export const faceTrackUserKey = '@Facetrack:user';
export const faceTrackTokenKey = '@Facetrack:token';
export const userLocationKey = '@Facetrack:userLocation';
export const introMessagesKey = '@Facetrack:introMessages';

//  notifications
export const notificationSettingsKey = '@Facetrack:notificationSettings';

// to solve issue where url listener is called multiple times
export const instagramCodeKey = '@Facetrack:instagramCode';
export const instagramTokenKey = (userProviderId: string): string =>
  `@Facetrack:${userProviderId}-instagramToken`;
export const instagramRequestDateKey = (userProviderId: string): string =>
  `@Facetrack:${userProviderId}-lastInstagramRequestDate`;
