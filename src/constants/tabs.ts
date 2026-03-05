import { StandardMapScreen } from '../screens/map/standard';
import type { MapTabItem } from '../types/navigation';

export const mapTabs: MapTabItem[] = [
  {
    name: 'Standard',
    title: 'Standard',
    icon: 'map',
    component: StandardMapScreen,
  },
  //   {
  //     name: 'Satellite',
  //     title: 'Satellite',
  //     icon: 'globe',
  //     component: SatelliteMapScreen,
  //   },
];
