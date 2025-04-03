import { useAuth } from '@/context/ctx';
import { Redirect,  Stack } from 'expo-router';

export default function TabLayout() {
  const {  authState } = useAuth();

  if (!authState.authenticated) {
    return <Redirect href={'/(auth)/login'} />;
  }
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="list" />
      <Stack.Screen name="search" />
      <Stack.Screen name="peer" />
      <Stack.Screen
        name="movie/[imdbID]"
        options={{
          headerShown: false,
        }}
      />
      
    </Stack>
  );
}
