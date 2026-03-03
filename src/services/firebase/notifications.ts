import { getApp } from '@react-native-firebase/app';
import {
  getInitialNotification,
  getMessaging,
  getToken,
  onMessage,
  onNotificationOpenedApp,
} from '@react-native-firebase/messaging';

/**
 * Recupera l'istanza principale dell'app Firebase
 */
const app = getApp();

/**
 * Crea l'istanza Messaging collegata all'app Firebase
 */
export const messagingInstance = getMessaging(app);

/**
 * Recupera il token FCM.
 * Questo token identifica in modo univoco
 * il dispositivo per l'invio delle push.
 */
export async function fetchFcmToken() {
  return getToken(messagingInstance);
}

/**
 * Listener per messaggi in foreground.
 * Si attiva quando la push arriva con app aperta.
 */
export function subscribeForegroundMessages(callback: (message: any) => void) {
  return onMessage(messagingInstance, callback);
}

/**
 * Listener per tap su notifica
 * quando l'app è in background.
 */
export function subscribeNotificationOpened(callback: (message: any) => void) {
  return onNotificationOpenedApp(messagingInstance, callback);
}

/**
 * Recupera la notifica che ha aperto l'app
 * quando era completamente chiusa.
 */
export async function getInitialNotificationData() {
  return getInitialNotification(messagingInstance);
}
