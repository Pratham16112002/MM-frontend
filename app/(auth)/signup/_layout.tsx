import { Stack } from 'expo-router';

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="verification"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="profile" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
