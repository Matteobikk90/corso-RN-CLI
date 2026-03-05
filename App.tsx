import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import './global.css';
import { RootDrawerNavigator } from './src/components/drawer-navigator';
import { darkTheme, lightTheme } from './src/constants/theme';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {/* <View style={styles.container}>
        <NotificationsFirebaseCli />
      </View> */}

      <NavigationContainer theme={isDarkMode ? darkTheme : lightTheme}>
        <RootDrawerNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
