import messaging from '@react-native-firebase/messaging';
import { useCallback, useEffect } from 'react';
import {
  Alert,
  Linking,
  PermissionsAndroid,
  Platform,
  Pressable,
  Text,
  View,
} from 'react-native';

export function NotificationsFirebaseCli() {
  const requestToken = useCallback(async () => {
    try {
      const token = await messaging().getToken();
      console.log('FCM token:', token);
    } catch (error) {
      console.error('getToken error:', error);
    }
  }, []);

  const requestPermissions = useCallback(async () => {
    try {
      if (Platform.OS === 'android' && Platform.Version >= 33) {
        const result = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );

        console.log('POST_NOTIFICATIONS:', result);

        if (result === PermissionsAndroid.RESULTS.GRANTED) {
          await requestToken();
        } else if (result === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
          Alert.alert(
            'Notifications disabled',
            'Enable notifications from app settings.',
          );
        } else {
          Alert.alert('Permission denied');
        }

        return;
      }

      await requestToken();
    } catch (error) {
      console.error('permission error:', error);
    }
  }, [requestToken]);

  useEffect(() => {
    requestPermissions();

    const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
      console.log(
        'Foreground message:',
        JSON.stringify(remoteMessage, null, 2),
      );
    });

    const unsubscribeOpened = messaging().onNotificationOpenedApp(
      remoteMessage => {
        console.log(
          'Opened from background:',
          JSON.stringify(remoteMessage, null, 2),
        );
      },
    );

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Opened from quit state:',
            JSON.stringify(remoteMessage, null, 2),
          );
        }
      });

    return () => {
      unsubscribeForeground();
      unsubscribeOpened();
    };
  }, [requestPermissions]);

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
