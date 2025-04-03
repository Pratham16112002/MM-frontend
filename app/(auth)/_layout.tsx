import { SplashScreen, Tabs } from 'expo-router';
import React from 'react';
import 'react-native-reanimated';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function AuthRootLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="login"
        options={{
          headerShown: false,
          tabBarStyle: {
            display: 'none',
          },
        }}
      />
      <Tabs.Screen
        name="signup"
        options={{
          headerShown: false,
          tabBarStyle: {
            display: 'none',
          },
        }}
      />
    </Tabs>
  );
}
