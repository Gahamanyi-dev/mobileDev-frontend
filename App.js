import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from './navigation';
import AuthProvider from "./components/GlobalContext";

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
      <StatusBar style="auto" />
      <Navigation/>
      </AuthProvider>
    </SafeAreaProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
