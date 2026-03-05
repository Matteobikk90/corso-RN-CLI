import { createDrawerNavigator } from '@react-navigation/drawer';
import { drawerList } from '../constants/drawer';
import type { DrawerParamList } from '../types/navigation';

const Drawer = createDrawerNavigator<DrawerParamList>();

export function RootDrawerNavigator() {
  return (
    <Drawer.Navigator>
      {drawerList.map(({ name, title, component }) => (
        <Drawer.Screen
          key={name}
          name={name}
          component={component}
          options={{ title }}
        />
      ))}
    </Drawer.Navigator>
  );
}
