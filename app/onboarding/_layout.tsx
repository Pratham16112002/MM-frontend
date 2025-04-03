import { Stack } from 'expo-router';
import React from 'react';
import 'react-native-reanimated';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="screen1" options={{ headerShown: false }} />
      <Stack.Screen name="screen2" options={{ headerShown: false }} />
      <Stack.Screen name="screen3" options={{ headerShown: false }} />
      <Stack.Screen name="screen4" options={{ headerShown: false }} />
    </Stack>
  );
}

export default AuthLayout;
