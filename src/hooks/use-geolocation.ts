// import Geolocation from '@react-native-community/geolocation';
// import { useEffect, useState } from 'react';
// import { Alert, PermissionsAndroid, Platform } from 'react-native';

// type Location = {
//   latitude: number;
//   longitude: number;
// };

// export function useGeolocation() {
//   const [location, setLocation] = useState<Location | null>(null);
//   const [loading, setLoding] = useState(true);

//   useEffect(() => {
//     const init = async () => {
//       if (Platform.OS === 'android') {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//         );

//         if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
//           Alert.alert('Permesso negato', 'Serve la posizione per la mappa');
//         }
//       }

//       Geolocation.getCurrentPosition(
//         position => {
//           setLocation({
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//           });
//           setLoding(false);
//         },
//         error => {
//           console.error(error);
//           setLoding(false);
//         },
//         {
//           enableHighAccuracy: false,
//           timeout: 20000,
//           maximumAge: 10000,
//         },
//       );
//     };

//     init();
//   }, []);

//   return { location, loading };
// }

export function useGeolocation() {
  return {
    loading: false,
    location: {
      latitude: 45.4642,
      longitude: 9.19,
    },
  };
}
