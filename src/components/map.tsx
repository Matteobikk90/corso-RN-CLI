import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { mapTabs } from '../constants/tabs';
import type { MapTabParamList } from '../types/navigation';

const Tab = createBottomTabNavigator<MapTabParamList>();

export const MapTabNavigator = () => {
  return (
    <Tab.Navigator>
      {mapTabs.map(({ name, title, component }) => (
        <Tab.Screen
          key={name}
          name={name}
          component={component}
          options={{ title }}
        />
      ))}
    </Tab.Navigator>
  );
};
