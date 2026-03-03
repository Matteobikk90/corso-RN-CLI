import notifee from '@notifee/react-native';
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
    /**
     * FUNZIONE DI INIZIALIZZAZIONE
     * Viene eseguita una sola volta al montaggio del componente.
     * - Chiede il permesso notifiche (Android 13+)
     * - Recupera il token FCM del dispositivo
     * - Crea il channel Android (obbligatorio)
     */
    async function init() {
      // Richiesta permesso notifiche
      const granted = await requestNotificationPermission();
      if (!granted) return;

      // Recupero token FCM (identificatore univoco del dispositivo)
      const token = await fetchFcmToken();

      /**
       * Creazione del canale notifiche Android.
       * Necessario da Android 8+.
       * Senza channel le notifiche non vengono mostrate.
       */
      await notifee.createChannel({
        id: 'default',
        name: 'Canale di default',
      });

      console.log('FCM token:', token);
    }

    init();

    /**
     * LISTENER FOREGROUND
     * Si attiva quando arriva una push mentre l'app è APERTA.
     * Android in questo caso NON mostra automaticamente il banner.
     * Quindi usiamo Notifee per mostrarlo manualmente.
     */
    const unsubscribeForeground = subscribeForegroundMessages(async message => {
      await notifee.displayNotification({
        title: message.notification?.title ?? 'Nuovo messaggio',
        body: message.notification?.body ?? '',
        android: {
          channelId: 'default',
          pressAction: {
            id: 'default', // necessario per rendere la notifica cliccabile
          },
        },
      });

      console.log('Foreground:', message);
    });

    /**
     * LISTENER TAP IN BACKGROUND
     * Si attiva quando:
     * - L'app è in background
     * - L'utente tocca la notifica
     */
    const unsubscribeOpened = subscribeNotificationOpened(message => {
      console.log('Aperta da background:', message);
    });

    /**
     * GESTIONE APP CHIUSA (QUIT STATE)
     * Si attiva quando:
     * - L'app era completamente chiusa
     * - L'utente tocca la notifica
     * - L'app viene avviata a causa di quella notifica
     */
    getInitialNotificationData().then(message => {
      if (message) {
        console.log('Aperta da stato chiuso:', message);
      }
    });

    /**
     * CLEANUP
     * Rimuove i listener quando il componente viene smontato.
     */
    return () => {
      unsubscribeForeground();
      unsubscribeOpened();
    };
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notifications CLI</Text>

      {/* Apre le impostazioni dell'app (utile se permesso negato definitivamente) */}
      <Pressable
        onPress={() => Linking.openSettings()}
        style={{ marginTop: 16 }}
      >
        <Text>Apri impostazioni</Text>
      </Pressable>
    </View>
  );
}
