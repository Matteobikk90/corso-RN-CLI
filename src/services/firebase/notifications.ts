import { getApp } from '@react-native-firebase/app';
import {
  getInitialNotification,
  getMessaging,
  getToken,
  onMessage,
  onNotificationOpenedApp,
} from '@react-native-firebase/messaging';

const app = getApp();
export const messagingInstance = getMessaging(app);

export async function fetchFcmToken() {
  return getToken(messagingInstance);
}

export function subscribeForegroundMessages(callback: (message: any) => void) {
  return onMessage(messagingInstance, callback);
}

export function subscribeNotificationOpened(callback: (message: any) => void) {
  return onNotificationOpenedApp(messagingInstance, callback);
}

export async function getInitialNotificationData() {
  return getInitialNotification(messagingInstance);
}
