import { Alert, PermissionsAndroid, Platform } from 'react-native';

/**
 * Richiede il permesso notifiche.
 *
 * Su Android 13+ (API 33+) è obbligatorio
 * richiedere il permesso POST_NOTIFICATIONS.
 *
 * Su versioni precedenti non serve.
 */
export async function requestNotificationPermission() {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );

    // Permesso concesso
    if (result === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    // Permesso negato definitivamente
    if (result === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      Alert.alert(
        'Notifiche disabilitate',
        'Abilita le notifiche dalle impostazioni dell’app.',
      );
    }

    return false;
  }

  // Android < 13 (permesso automatico)
  return true;
}
