import type { ComponentType } from 'react';

export type DrawerItem = {
  name: keyof DrawerParamList;
  title: string;
  component: ComponentType;
};

export type DrawerParamList = {
  Mappa: undefined;
  Biometrics: undefined;
  Haptics: undefined;
  Clipboard: undefined;
  QRScanner: undefined;
};

export type MapTabParamList = {
  Standard: undefined;
  Satellite: undefined;
};
