import messaging from '@react-native-firebase/messaging';
import { useCallback, useEffect } from 'react';
import {
  Alert,
  Linking,
  PermissionsAndroid,
  Pressable,
  Text,
  View,
} from 'react-native';

export function NotificationsFirebaseCli() {
  const requestPermissions = useCallback(async () => {
    try {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      console.log({ result });

      if (result === PermissionsAndroid.RESULTS.GRANTED) {
        requestToken();
      } else {
        Alert.alert('Permission denied');
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const requestToken = async () => {
    try {
      const token = await messaging().getToken();

      console.log({ token });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    requestPermissions();
  }, [requestPermissions]);

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text>Notifications CLI </Text>

      <Pressable onPress={() => Linking.openSettings()}>
        <Text>Open</Text>
      </Pressable>
    </View>
  );
}
