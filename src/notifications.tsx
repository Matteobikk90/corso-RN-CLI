import { useEffect } from 'react';
import { Linking, Pressable, Text, View } from 'react-native';
import {
  fetchFcmToken,
  getInitialNotificationData,
  subscribeForegroundMessages,
  subscribeNotificationOpened,
} from './services/firebase/notifications';
import { requestNotificationPermission } from './services/firebase/permissions';

export function NotificationsFirebaseCli() {
  useEffect(() => {
    async function init() {
      const granted = await requestNotificationPermission();
      if (!granted) return;

      const token = await fetchFcmToken();
      console.log('FCM token:', token);
    }

    init();

    const unsubscribeForeground = subscribeForegroundMessages(message => {
      console.log('Foreground:', message);
    });

    const unsubscribeOpened = subscribeNotificationOpened(message => {
      console.log('Opened from background:', message);
    });

    getInitialNotificationData().then(message => {
      if (message) {
        console.log('Opened from quit:', message);
      }
    });

    return () => {
      unsubscribeForeground();
      unsubscribeOpened();
    };
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notifications CLI</Text>

      <Pressable
        onPress={() => Linking.openSettings()}
        style={{ marginTop: 16 }}
      >
        <Text>Open settings</Text>
      </Pressable>
    </View>
  );
}
