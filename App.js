import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { UserProvider } from './contexts/userContext';
import Auth from './screens/Auth';

export default function App() {

  return (
    <UserProvider>
      <SafeAreaProvider>
        <Auth />
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </UserProvider>
  );
}
