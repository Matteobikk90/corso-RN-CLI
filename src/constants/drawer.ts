import { MapTabNavigator } from '../components/map';
import { BiometricsScreen } from '../screens/biometrics';
import type { DrawerItem } from '../types/navigation';

export const drawerList: DrawerItem[] = [
  {
    name: 'Mappa',
    title: 'Mappa',
    component: MapTabNavigator,
  },
  {
    name: 'Biometrics',
    title: 'Biometrics',
    component: BiometricsScreen,
  },
  //   {
  //     name: 'Haptics',
  //     title: 'Haptics',
  //     component: HapticsScreen,
  //   },
  //   {
  //     name: 'Clipboard',
  //     title: 'Clipboard',
  //     component: ClipboardScreen,
  //   },
  //   {
  //     name: 'QRScanner',
  //     title: 'QRScanner',
  //     component: QRScannerScreen,
  //   },
];
