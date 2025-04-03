import { OTPProvider } from '@/context/otpCtx';
import { Stack } from 'expo-router';
import React from 'react';

const AuthLoginLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="forgotpassword"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="verification" options={{ headerShown: false }} />
      <Stack.Screen name="password" options={{ headerShown: false }} />
      <Stack.Screen name="success" options={{ headerShown: false }} />
    </Stack>
  );
};

function AuthLoginRootLayout() {
  return (
    <OTPProvider>
      <AuthLoginLayout />
    </OTPProvider>
  );
}

export default AuthLoginRootLayout;
