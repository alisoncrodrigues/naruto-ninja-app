
import { StatusBar } from 'expo-status-bar';

import {
  PaperProvider,
  MD3DarkTheme
} from 'react-native-paper';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import AppNavigator from './src/navigation/AppNavigator';

const temaNaruto = {

  ...MD3DarkTheme,

  colors: {
    ...MD3DarkTheme.colors,

    primary: '#FF7A00',
    onPrimary: '#FFFFFF',

    secondary: '#7CB342',
    onSecondary: '#0B1220',

    background: '#0B1220',
    surface: '#182436',
    onSurface: '#FFFFFF',
  },

};

export default function App() {

  return (
    <SafeAreaProvider>

      <PaperProvider theme={temaNaruto}>

        <StatusBar style="light" />

        <AppNavigator />

      </PaperProvider>

    </SafeAreaProvider>
  );
}
